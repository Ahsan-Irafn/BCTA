const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

async function captureTestimonials() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--remote-debugging-port=9225',
    'http://localhost:3005/south-australia',
  ]);

  await new Promise((r) => setTimeout(r, 3000));

  try {
    const list = await new Promise((resolve, reject) => {
      http.get('http://127.0.0.1:9225/json/list', (res) => {
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

    // 1. Desktop 1440px
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 1050,
      deviceScaleFactor: 1,
      mobile: false,
    });

    await send('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('testimonials');
        if (el) { el.scrollIntoView({ behavior: 'instant', block: 'center' }); }
      `,
    });
    await new Promise((r) => setTimeout(r, 1500));

    const desktopShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(brainDir, 'testimonials-gallery-desktop.png'), Buffer.from(desktopShot.data, 'base64'));
    console.log('Saved testimonials-gallery-desktop.png');

    // 2. Open Video Modal Dialog
    await send('Runtime.evaluate', {
      expression: `
        const watchBtn = document.querySelector('button[class*="watchStoryBtn"]');
        if (watchBtn) { watchBtn.click(); }
      `,
    });
    await new Promise((r) => setTimeout(r, 1200));

    const modalShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(brainDir, 'testimonials-video-modal.png'), Buffer.from(modalShot.data, 'base64'));
    console.log('Saved testimonials-video-modal.png');

    // Close modal
    await send('Runtime.evaluate', {
      expression: `
        const closeBtn = document.querySelector('button[class*="modalCloseBtn"]');
        if (closeBtn) { closeBtn.click(); }
      `,
    });
    await new Promise((r) => setTimeout(r, 600));

    // 3. Mobile 390px
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 940,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await send('Runtime.evaluate', {
      expression: `
        window.dispatchEvent(new Event('resize'));
        const el = document.getElementById('testimonials');
        if (el) { el.scrollIntoView({ behavior: 'instant', block: 'center' }); }
      `,
    });
    await new Promise((r) => setTimeout(r, 1200));

    const mobileShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(brainDir, 'testimonials-gallery-mobile.png'), Buffer.from(mobileShot.data, 'base64'));
    console.log('Saved testimonials-gallery-mobile.png');

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

captureTestimonials().catch(console.error);
