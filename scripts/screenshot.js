const http = require('http');
const fs = require('fs');
const { spawn } = require('child_process');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--remote-debugging-port=9222',
    'http://localhost:3005/',
  ]);

  await new Promise((r) => setTimeout(r, 3000));

  try {
    const list = await new Promise((resolve, reject) => {
      http.get('http://127.0.0.1:9222/json/list', (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => resolve(JSON.parse(data)));
      }).on('error', reject);
    });

    const target = list.find((t) => t.type === 'page' && t.url.includes('localhost:3005')) || list[0];
    if (!target) throw new Error('No target page found');

    console.log('Connected to target:', target.url);
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

    const brainDir = 'C:\\Users\\Ahsan\\.gemini\\antigravity-ide\\brain\\e2155659-e567-44e0-9dd2-39a6909cf0b4';

    // Set desktop metrics
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    // Scroll through the entire page in increments to trigger all lazy-loaders and IntersectionObservers
    await send('Runtime.evaluate', {
      expression: `
        (async () => {
          const totalHeight = document.body.scrollHeight;
          const step = 800;
          for (let y = 0; y <= totalHeight; y += step) {
            window.scrollTo(0, y);
            await new Promise(r => setTimeout(r, 150));
          }
          await new Promise(r => setTimeout(r, 600));
          window.scrollTo(0, 0);
        })()
      `,
      awaitPromise: true,
    });

    await new Promise((r) => setTimeout(r, 1000));

    // 1. Focused capture: Header
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, 0);` });
    await new Promise((r) => setTimeout(r, 300));
    const headerShot = await send('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 0, y: 0, width: 1440, height: 110, scale: 1 },
    });
    fs.writeFileSync(`${brainDir}\\header-preview.png`, Buffer.from(headerShot.data, 'base64'));
    console.log('✓ Header preview saved');

    // 2. Focused capture: Registration Form (#enq1)
    const formRect = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.getElementById('enq1');
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return { x: 0, y: Math.round(r.top + window.scrollY), width: 1440, height: Math.round(r.height) };
        })()
      `,
      returnByValue: true,
    });

    if (formRect?.result?.value) {
      const { x, y, width, height } = formRect.result.value;
      const formShot = await send('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: true,
        clip: { x, y, width, height, scale: 1 },
      });
      fs.writeFileSync(`${brainDir}\\registration-form-preview.png`, Buffer.from(formShot.data, 'base64'));
      console.log('✓ Registration Form preview saved');
    }

    // 3. Focused capture: Adelaide Location Section (#location-adelaide)
    await send('Runtime.evaluate', {
      expression: `document.getElementById('location-adelaide')?.scrollIntoView({ behavior: 'instant', block: 'center' });`,
    });
    await new Promise((r) => setTimeout(r, 2500));

    const locRect = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.getElementById('location-adelaide');
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return { x: 0, y: Math.round(r.top + window.scrollY), width: 1440, height: Math.round(r.height) };
        })()
      `,
      returnByValue: true,
    });

    if (locRect?.result?.value) {
      const { x, y, width, height } = locRect.result.value;
      const locShot = await send('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: true,
        clip: { x, y, width, height, scale: 1 },
      });
      fs.writeFileSync(`${brainDir}\\adelaide-location-preview.png`, Buffer.from(locShot.data, 'base64'));
      console.log('✓ Adelaide Location preview saved');
    }

    // 4. Focused capture: Footer (#colophon)
    const footerRect = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.getElementById('colophon');
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return { x: 0, y: Math.round(r.top + window.scrollY), width: 1440, height: Math.round(r.height) };
        })()
      `,
      returnByValue: true,
    });

    if (footerRect?.result?.value) {
      const { x, y, width, height } = footerRect.result.value;
      const footerShot = await send('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: true,
        clip: { x, y, width, height, scale: 1 },
      });
      fs.writeFileSync(`${brainDir}\\footer-preview.png`, Buffer.from(footerShot.data, 'base64'));
      console.log('✓ Footer preview saved');
    }

    // 5. Desktop full-page screenshot
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, 0);` });
    await new Promise((r) => setTimeout(r, 500));

    const fullDeskShot = await send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
    });

    const outPath = `${brainDir}\\bcta-full-homepage.png`;
    const deskBuffer = Buffer.from(fullDeskShot.data, 'base64');
    fs.writeFileSync(outPath, deskBuffer);
    console.log('✓ Full desktop homepage saved to:', outPath);

    // 6. Mobile view full-page screenshot
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 1,
      mobile: true,
    });

    // Reload for pristine mobile layout calculation
    await send('Page.navigate', { url: 'http://localhost:3005/' });
    await new Promise((r) => setTimeout(r, 2500));

    // Scroll mobile to trigger mobile observers
    await send('Runtime.evaluate', {
      expression: `
        (async () => {
          const totalHeight = document.body.scrollHeight;
          for (let y = 0; y <= totalHeight; y += 600) {
            window.scrollTo(0, y);
            await new Promise(r => setTimeout(r, 120));
          }
          await new Promise(r => setTimeout(r, 400));
          window.scrollTo(0, 0);
        })()
      `,
      awaitPromise: true,
    });

    await new Promise((r) => setTimeout(r, 1000));

    const mobileShot = await send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
    });

    const mobileOut = `${brainDir}\\bcta-full-mobile.png`;
    const mobileBuffer = Buffer.from(mobileShot.data, 'base64');
    fs.writeFileSync(mobileOut, mobileBuffer);
    console.log('✓ Full mobile homepage saved to:', mobileOut);

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

main().catch(console.error);
