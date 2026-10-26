const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn, execSync } = require('child_process');

const PORT = 3000;
const BRAIN_DIR = 'C:\\Users\\Ahsan\\.gemini\\antigravity-ide\\brain\\e2155659-e567-44e0-9dd2-39a6909cf0b4';

try {
  execSync('taskkill /f /im chrome.exe /fi "WINDOWTITLE eq data:*" 2>nul');
} catch (e) {}

async function run() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    `http://localhost:${PORT}/courses/diploma-of-building-and-construction-south-australia`,
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

  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });

  await new Promise((r) => setTimeout(r, 2000));

  async function captureElementViewport(selector, filename) {
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.querySelector('${selector}');
          if (el) el.scrollIntoView({ block: 'start', behavior: 'instant' });
        })()
      `,
    });
    await new Promise((r) => setTimeout(r, 1000));

    const evalRes = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.querySelector('${selector}');
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return {
            x: Math.max(0, rect.left),
            y: Math.max(0, rect.top),
            width: Math.min(window.innerWidth, rect.width),
            height: Math.min(window.innerHeight - Math.max(0, rect.top), rect.height)
          };
        })()
      `,
      returnByValue: true,
    });

    const rect = evalRes?.result?.value;
    if (!rect) {
      console.log(`Selector not found: ${selector}`);
      return;
    }

    const shot = await send('Page.captureScreenshot', {
      format: 'png',
      clip: {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        scale: 1,
      },
    });

    const buf = Buffer.from(shot.data, 'base64');
    const outPath = path.join(BRAIN_DIR, filename);
    fs.writeFileSync(outPath, buf);
    console.log(`Saved screenshot: ${outPath} (${buf.length} bytes)`);
  }

  try {
    console.log('1. Capturing Career Opportunities Section...');
    await captureElementViewport('section[aria-label="Career Outcomes and Pathways"]', 'career-pathways-updated.png');

    console.log('2. Capturing Delivery Schedule Section...');
    await captureElementViewport('section[aria-label="Course Delivery and Format"]', 'delivery-schedule-updated.png');

    console.log('3. Capturing Course Units Compact Section...');
    await captureElementViewport('#course-units', 'course-units-compact.png');

    console.log('Captures completed.');
  } finally {
    ws.close();
    chromeProc.kill();
  }
}

run().catch((e) => {
  console.error('Error:', e);
  process.exit(1);
});
