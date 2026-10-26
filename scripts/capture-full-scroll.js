const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const brainDir = 'C:\\Users\\Ahsan\\.gemini\\antigravity-ide\\brain\\e2155659-e567-44e0-9dd2-39a6909cf0b4';

async function captureScrolled() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--remote-debugging-port=9222',
    'http://localhost:3000/south-australia',
  ]);

  await new Promise((r) => setTimeout(r, 2500));

  try {
    const list = await new Promise((resolve, reject) => {
      http.get('http://127.0.0.1:9222/json/list', (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => resolve(JSON.parse(data)));
      }).on('error', reject);
    });

    const target = list.find((t) => t.type === 'page') || list[0];
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

    // Capture at y=850 (Flagship & Dossier)
    await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 850)' });
    await new Promise((r) => setTimeout(r, 800));
    const shot1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(brainDir, 'sa-scroll-850.png'), Buffer.from(shot1.data, 'base64'));

    // Capture at y=1700 (Blueprint & Practical Mentorship)
    await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 1700)' });
    await new Promise((r) => setTimeout(r, 800));
    const shot2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(brainDir, 'sa-scroll-1700.png'), Buffer.from(shot2.data, 'base64'));

    ws.close();
    console.log('✓ Captured scrolled sections of south-australia!');
  } finally {
    try {
      chromeProc.kill();
    } catch (e) {}
  }
}

captureScrolled().catch(console.error);
