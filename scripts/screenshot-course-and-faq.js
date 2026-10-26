const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn, execSync } = require('child_process');

const PORT = 3005;
const BRAIN_DIR = 'C:\\Users\\Ahsan\\.gemini\\antigravity-ide\\brain\\e2155659-e567-44e0-9dd2-39a6909cf0b4';

// Ensure any stale headless chrome is closed first
try {
  execSync('taskkill /f /im chrome.exe /fi "WINDOWTITLE eq data:*" 2>nul');
} catch (e) {}

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    `http://localhost:${PORT}/south-australia`,
  ]);

  await new Promise((r) => setTimeout(r, 3000));

  const list = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json/list', (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const target = list.find((t) => t.type === 'page' && t.url.includes(String(PORT))) || list[0];
  if (!target) throw new Error('No target page found');

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve) => (ws.onopen = resolve));

  let id = 1;
  function send(method, params = {}) {
    return new Promise((resolve) => {
      const curId = id++;
      const handler = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === curId) {
          ws.removeEventListener('message', handler);
          resolve(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: curId, method, params }));
    });
  }

  await send('Page.enable');
  await send('Runtime.enable');
  await send('DOM.enable');

  async function captureClip(selector, filename) {
    const expr = `
      (() => {
        const el = document.querySelector('${selector}');
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return { x: rect.x + window.scrollX, y: rect.y + window.scrollY, width: rect.width, height: rect.height };
      })()
    `;
    const evalRes = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
    const rect = evalRes?.result?.value;
    if (!rect) {
      console.log(`Selector not found: ${selector}`);
      return;
    }

    const clip = {
      x: Math.max(0, rect.x),
      y: Math.max(0, rect.y),
      width: Math.min(rect.width, 1440),
      height: rect.height,
      scale: 1,
    };

    const shot = await send('Page.captureScreenshot', { format: 'png', clip });
    const buf = Buffer.from(shot.data, 'base64');
    const outPath = path.join(BRAIN_DIR, filename);
    fs.writeFileSync(outPath, buf);
    console.log(`Saved screenshot: ${outPath} (${buf.length} bytes)`);
  }

  async function captureFullPage(filename, maxW = 1440) {
    const metrics = await send('Page.getLayoutMetrics');
    const width = Math.min(metrics.contentSize.width || maxW, maxW);
    const height = metrics.contentSize.height || 4000;

    const shot = await send('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 0, y: 0, width, height, scale: 1 },
      captureBeyondViewport: true,
    });
    const buf = Buffer.from(shot.data, 'base64');
    const outPath = path.join(BRAIN_DIR, filename);
    fs.writeFileSync(outPath, buf);
    console.log(`Saved fullpage screenshot: ${outPath} (${buf.length} bytes)`);
  }

  try {
    console.log('1. Capturing Homepage FAQs...');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    await new Promise((r) => setTimeout(r, 2000));

    // Expand the first FAQ
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const btn = document.querySelector('#faq-btn-1');
          if (btn) btn.click();
        })()
      `,
    });
    await new Promise((r) => setTimeout(r, 800));

    await captureClip('#homepage-faqs', 'homepage-faqs-preview.png');

    console.log('2. Navigating to Diploma Course Page...');
    await send('Page.navigate', {
      url: `http://localhost:${PORT}/courses/diploma-of-building-and-construction-south-australia`,
    });

    await new Promise((r) => setTimeout(r, 3000));

    // Course Hero
    await captureClip('#course-hero', 'cpc50220-hero-preview.png');

    // Course Units Table
    await captureClip('#course-units', 'cpc50220-units-preview.png');

    // Course Fees & Funding
    await captureClip('#fees-funding', 'cpc50220-fees-preview.png');

    // Course FAQs
    await captureClip('#course-faqs', 'cpc50220-faqs-preview.png');

    // Course Registration Form
    await captureClip('#enquire-form', 'cpc50220-registration-preview.png');

    // Desktop Full Page
    await captureFullPage('cpc50220-desktop-fullpage.png', 1440);

    // Mobile View
    console.log('3. Capturing Mobile View...');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await new Promise((r) => setTimeout(r, 1500));
    await captureFullPage('cpc50220-mobile-fullpage.png', 390);

    console.log('All screenshots captured successfully!');
  } finally {
    ws.close();
    chromeProc.kill();
  }
}

main().catch((e) => {
  console.error('Error during screenshots:', e);
  process.exit(1);
});
