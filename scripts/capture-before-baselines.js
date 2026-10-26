const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const brainDir = 'C:\\Users\\Ahsan\\.gemini\\antigravity-ide\\brain\\e2155659-e567-44e0-9dd2-39a6909cf0b4';
const beforeDir = path.join(__dirname, '..', 'screenshots', 'before');

if (!fs.existsSync(beforeDir)) {
  fs.mkdirSync(beforeDir, { recursive: true });
}

async function captureBaselines() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--remote-debugging-port=9222',
    'http://localhost:3000/',
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
      { id: 'homepage', url: 'http://localhost:3000/' },
      { id: 'south-australia', url: 'http://localhost:3000/south-australia' },
      { id: 'course-diploma-sa', url: 'http://localhost:3000/courses/diploma-of-building-and-construction-south-australia' },
      { id: 'funding', url: 'http://localhost:3000/government-funding-for-your-building-construction-course' },
      { id: 'contact', url: 'http://localhost:3000/contact-us-south-australia' },
    ];

    for (const p of pages) {
      console.log(`Capturing BEFORE baseline for ${p.id} (${p.url})...`);
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

      const desktopShot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(beforeDir, `${p.id}-desktop-before.png`), Buffer.from(desktopShot.data, 'base64'));
      fs.writeFileSync(path.join(brainDir, `${p.id}-desktop-before.png`), Buffer.from(desktopShot.data, 'base64'));
      console.log(`✓ Saved ${p.id}-desktop-before.png`);

      // 2. Mobile 390x844
      await send('Emulation.setDeviceMetricsOverride', {
        width: 390,
        height: 844,
        deviceScaleFactor: 2,
        mobile: true,
      });
      await new Promise((r) => setTimeout(r, 1000));

      const mobileShot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(beforeDir, `${p.id}-mobile-before.png`), Buffer.from(mobileShot.data, 'base64'));
      fs.writeFileSync(path.join(brainDir, `${p.id}-mobile-before.png`), Buffer.from(mobileShot.data, 'base64'));
      console.log(`✓ Saved ${p.id}-mobile-before.png`);
    }

    ws.close();
    console.log('✓ All BEFORE baseline screenshots captured successfully!');
  } finally {
    try {
      chromeProc.kill();
    } catch (e) {}
  }
}

captureBaselines().catch((err) => {
  console.error('Error capturing baselines:', err);
  process.exit(1);
});
