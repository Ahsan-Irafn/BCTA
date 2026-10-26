const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const brainDir = 'C:\\Users\\Ahsan\\.gemini\\antigravity-ide\\brain\\e2155659-e567-44e0-9dd2-39a6909cf0b4';
const localScreenshotsDir = path.join(__dirname, '..', 'screenshots');

if (!fs.existsSync(localScreenshotsDir)) {
  fs.mkdirSync(localScreenshotsDir, { recursive: true });
}

async function capture() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--remote-debugging-port=9222',
    'http://localhost:3000/contact-us-south-australia',
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

    const target = list.find((t) => t.type === 'page' && t.url.includes('localhost:3000')) || list[0];
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

    const pages = [
      {
        name: 'contact-us-redesign',
        url: 'http://localhost:3000/contact-us-south-australia',
      },
      {
        name: 'government-funding-redesign',
        url: 'http://localhost:3000/government-funding-for-your-building-construction-course',
      },
      {
        name: 'south-australia-redesign',
        url: 'http://localhost:3000/south-australia',
      },
    ];

    for (const p of pages) {
      console.log(`Navigating to ${p.url}...`);
      await send('Page.navigate', { url: p.url });
      await new Promise((r) => setTimeout(r, 2500));

      // 1. Desktop 1440x900
      await send('Emulation.setDeviceMetricsOverride', {
        width: 1440,
        height: 900,
        deviceScaleFactor: 1,
        mobile: false,
      });
      await new Promise((r) => setTimeout(r, 1000));

      const desktopShot = await send('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: false,
      });
      const desktopFilename = `${p.name}-desktop.png`;
      fs.writeFileSync(path.join(localScreenshotsDir, desktopFilename), Buffer.from(desktopShot.data, 'base64'));
      fs.writeFileSync(path.join(brainDir, desktopFilename), Buffer.from(desktopShot.data, 'base64'));
      console.log(`✓ Saved ${desktopFilename}`);

      // 2. Mobile 390x844
      await send('Emulation.setDeviceMetricsOverride', {
        width: 390,
        height: 844,
        deviceScaleFactor: 2,
        mobile: true,
      });
      await new Promise((r) => setTimeout(r, 1000));

      const mobileShot = await send('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: false,
      });
      const mobileFilename = `${p.name}-mobile.png`;
      fs.writeFileSync(path.join(localScreenshotsDir, mobileFilename), Buffer.from(mobileShot.data, 'base64'));
      fs.writeFileSync(path.join(brainDir, mobileFilename), Buffer.from(mobileShot.data, 'base64'));
      console.log(`✓ Saved ${mobileFilename}`);
    }

    ws.close();
    console.log('✓ All verification screenshots captured successfully!');
  } finally {
    try {
      chromeProc.kill();
    } catch (e) {}
  }
}

capture().catch((err) => {
  console.error('Screenshot error:', err);
  process.exit(1);
});
