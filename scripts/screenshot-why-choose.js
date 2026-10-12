const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

async function captureWhyChoose() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--remote-debugging-port=9224',
    'http://localhost:3005/south-australia',
  ]);

  await new Promise((r) => setTimeout(r, 3000));

  try {
    const list = await new Promise((resolve, reject) => {
      http.get('http://127.0.0.1:9224/json/list', (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => resolve(JSON.parse(data)));
      }).on('error', reject);
    });

    const target = list.find((t) => t.type === 'page' && t.url.includes('south-australia')) || list[0];
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
    await send('Runtime.enable');
    await new Promise((r) => setTimeout(r, 2000));

    const brainDir = 'C:\\Users\\Ahsan\\.gemini\\antigravity-ide\\brain\\c1ef504d-45c5-4c5d-a74d-8f8fe1cb4d2e';

    // 1. Desktop 1440px - Layer 1 Active
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 980,
      deviceScaleFactor: 1,
      mobile: false,
    });

    await send('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('why-choose');
        if (el) { el.scrollIntoView({ behavior: 'instant', block: 'center' }); }
      `,
    });
    await new Promise((r) => setTimeout(r, 1500));

    const desktopShot1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(brainDir, 'why-study-bcta-desktop.png'), Buffer.from(desktopShot1.data, 'base64'));
    console.log('Saved why-study-bcta-desktop.png');

    // 2. Desktop 1440px - Click Layer 2 (Industry & Experience)
    await send('Runtime.evaluate', {
      expression: `
        const tab2 = document.getElementById('tab-layer-industry');
        if (tab2) { tab2.click(); }
      `,
    });
    await new Promise((r) => setTimeout(r, 800));

    const desktopShot2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(brainDir, 'why-study-bcta-interactive.png'), Buffer.from(desktopShot2.data, 'base64'));
    console.log('Saved why-study-bcta-interactive.png');

    // 3. Mobile 390px
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 920,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await send('Runtime.evaluate', {
      expression: `
        window.dispatchEvent(new Event('resize'));
        const el = document.getElementById('why-choose');
        if (el) { el.scrollIntoView({ behavior: 'instant', block: 'center' }); }
      `,
    });
    await new Promise((r) => setTimeout(r, 1200));

    const mobileShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(brainDir, 'why-study-bcta-mobile.png'), Buffer.from(mobileShot.data, 'base64'));
    console.log('Saved why-study-bcta-mobile.png');

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

captureWhyChoose().catch(console.error);
