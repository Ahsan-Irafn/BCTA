const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

async function run() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--remote-debugging-port=9252',
    'http://localhost:3005/south-australia',
  ]);

  await new Promise((r) => setTimeout(r, 4000));
  try {
    const list = await new Promise((resolve, reject) => {
      http.get('http://127.0.0.1:9252/json/list', (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => resolve(JSON.parse(data)));
      }).on('error', reject);
    });
    const target = list.find((t) => t.type === 'page' && t.url.includes('south-australia')) || list[0];
    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((resolve) => ws.onopen = resolve);

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
    const brainDir = 'C:\\Users\\Ahsan\\.gemini\\antigravity-ide\\brain\\c1ef504d-45c5-4c5d-a74d-8f8fe1cb4d2e';

    // 1. Desktop: Viewport capturing form panel and contact card
    await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1100, deviceScaleFactor: 1, mobile: false });
    await send('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('webform5571336000116229005');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
      `
    });
    await new Promise((r) => setTimeout(r, 1200));
    const s1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(brainDir, 'register-form-desktop-full.png'), Buffer.from(s1.data, 'base64'));
    console.log('Saved register-form-desktop-full.png');

    // 2. Mobile: Viewport capturing form inputs and submit button
    await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
    await send('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('webform5571336000116229005');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      `
    });
    await new Promise((r) => setTimeout(r, 1200));
    const s2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(brainDir, 'register-form-mobile-full.png'), Buffer.from(s2.data, 'base64'));
    console.log('Saved register-form-mobile-full.png');

    ws.close();
  } finally {
    chromeProc.kill();
  }
}
run();
