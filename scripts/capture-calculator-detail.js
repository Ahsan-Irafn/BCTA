const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const brainDir = 'C:\\Users\\Ahsan\\.gemini\\antigravity-ide\\brain\\e2155659-e567-44e0-9dd2-39a6909cf0b4';

async function captureCalc() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--remote-debugging-port=9224',
    'http://localhost:3000/south-australia',
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

    const target = list.find((t) => t.type === 'page') || list[0];
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

    // Navigate to south-australia and scroll directly to calculatorCard
    await send('Page.navigate', { url: 'http://localhost:3000/south-australia' });
    await new Promise((r) => setTimeout(r, 2500));
    await send('Runtime.evaluate', {
      expression: `
        const card = document.querySelector('div[class*="calculatorCard"]');
        if (card) {
          card.scrollIntoView({ behavior: 'instant', block: 'center' });
        }
      `
    });
    await new Promise((r) => setTimeout(r, 1200));

    let shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(brainDir, 'fee-calculator-detail.png'), Buffer.from(shot.data, 'base64'));
    console.log('✓ Captured fee-calculator-detail.png');

    ws.close();
  } finally {
    try {
      process.kill(chromeProc.pid);
    } catch (e) {}
  }
}

captureCalc().catch(console.error);
