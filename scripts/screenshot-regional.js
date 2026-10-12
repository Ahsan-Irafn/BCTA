const http = require('http');
const fs = require('fs');
const { spawn } = require('child_process');

async function captureRoute(routePath, prefix) {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--remote-debugging-port=9222',
    `http://localhost:3005${routePath}`,
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

    const target = list.find((t) => t.type === 'page' && t.url.includes(routePath)) || list[0];
    if (!target) throw new Error('No target page found');

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
    await new Promise((r) => setTimeout(r, 2000));

    // Desktop
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    await new Promise((r) => setTimeout(r, 1000));

    const shot = await send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
    });

    const brainDir = 'C:\\Users\\Ahsan\\.gemini\\antigravity-ide\\brain\\c1ef504d-45c5-4c5d-a74d-8f8fe1cb4d2e';
    const outPath = `${brainDir}\\${prefix}-desktop.png`;
    fs.writeFileSync(outPath, Buffer.from(shot.data, 'base64'));
    console.log(`Saved ${prefix} desktop to:`, outPath);

    // Mobile
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

    const mobileOut = `${brainDir}\\${prefix}-mobile.png`;
    fs.writeFileSync(mobileOut, Buffer.from(mobileShot.data, 'base64'));
    console.log(`Saved ${prefix} mobile to:`, mobileOut);

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

async function main() {
  console.log('Capturing South Australia...');
  await captureRoute('/south-australia', 'bcta-sa');
  await new Promise((r) => setTimeout(r, 2000));
  console.log('Capturing Western Australia...');
  await captureRoute('/western-australia', 'bcta-wa');
  console.log('Done capturing regional pages!');
}

main().catch(console.error);
