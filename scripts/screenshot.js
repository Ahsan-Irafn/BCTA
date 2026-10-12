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

  await new Promise((r) => setTimeout(r, 2500));

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
    await new Promise((r) => setTimeout(r, 1500));

    // Desktop screenshot with captureBeyondViewport
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    const shot = await send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
    });

    const brainDir = 'C:\\Users\\Ahsan\\.gemini\\antigravity-ide\\brain\\c1ef504d-45c5-4c5d-a74d-8f8fe1cb4d2e';
    const outPath = `${brainDir}\\bcta-full-homepage.png`;
    const publicDeskPath = 'z:\\next jss\\public\\desktop-preview.png';
    const deskBuffer = Buffer.from(shot.data, 'base64');
    fs.writeFileSync(outPath, deskBuffer);
    fs.writeFileSync(publicDeskPath, deskBuffer);
    console.log('Full desktop homepage saved to:', outPath);

    // Mobile view
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });

    await new Promise((r) => setTimeout(r, 1000));

    const mobileShot = await send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
    });

    const mobileOut = `${brainDir}\\bcta-full-mobile.png`;
    const publicMobilePath = 'z:\\next jss\\public\\mobile-preview.png';
    const mobileBuffer = Buffer.from(mobileShot.data, 'base64');
    fs.writeFileSync(mobileOut, mobileBuffer);
    fs.writeFileSync(publicMobilePath, mobileBuffer);
    console.log('Full mobile homepage saved to:', mobileOut);

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

main().catch(console.error);
