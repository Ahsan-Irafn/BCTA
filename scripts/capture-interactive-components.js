const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const brainDir = 'C:\\Users\\Ahsan\\.gemini\\antigravity-ide\\brain\\e2155659-e567-44e0-9dd2-39a6909cf0b4';

async function captureInteractive() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--remote-debugging-port=9223',
    'http://localhost:3000/south-australia',
  ]);

  await new Promise((r) => setTimeout(r, 3000));

  try {
    const list = await new Promise((resolve, reject) => {
      http.get('http://127.0.0.1:9223/json/list', (res) => {
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

    // 1. South Australia Course & Fee Calculator
    await send('Page.navigate', { url: 'http://localhost:3000/south-australia' });
    await new Promise((r) => setTimeout(r, 2500));
    // Scroll to fee calculator
    await send('Runtime.evaluate', {
      expression: `
        const el = document.querySelector('div[style*="margin-top: 3.5rem"]') || document.getElementById('courses');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
      `
    });
    await new Promise((r) => setTimeout(r, 1200));
    let shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(brainDir, 'component-fee-calculator.png'), Buffer.from(shot.data, 'base64'));
    console.log('✓ Captured component-fee-calculator.png');

    // 2. FAQ Accordion Section
    await send('Runtime.evaluate', {
      expression: `
        const faq = document.getElementById('homepage-faqs');
        if (faq) faq.scrollIntoView({ behavior: 'instant', block: 'center' });
      `
    });
    await new Promise((r) => setTimeout(r, 1200));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(brainDir, 'component-motion-accordion.png'), Buffer.from(shot.data, 'base64'));
    console.log('✓ Captured component-motion-accordion.png');

    // 3. Contact Page Map & Tabs
    await send('Page.navigate', { url: 'http://localhost:3000/contact-us-south-australia' });
    await new Promise((r) => setTimeout(r, 2500));
    // Scroll to map section
    await send('Runtime.evaluate', {
      expression: `
        const map = document.querySelector('section[aria-label="Campus Location Map"]');
        if (map) map.scrollIntoView({ behavior: 'instant', block: 'center' });
      `
    });
    await new Promise((r) => setTimeout(r, 1200));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(brainDir, 'component-contact-map.png'), Buffer.from(shot.data, 'base64'));
    console.log('✓ Captured component-contact-map.png');

    // 4. Funding Page Fee Calculator
    await send('Page.navigate', { url: 'http://localhost:3000/government-funding-for-your-building-construction-course' });
    await new Promise((r) => setTimeout(r, 2500));
    await send('Runtime.evaluate', {
      expression: `
        const fee = document.querySelector('div[style*="margin-bottom: 3.5rem"]');
        if (fee) fee.scrollIntoView({ behavior: 'instant', block: 'center' });
      `
    });
    await new Promise((r) => setTimeout(r, 1200));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(brainDir, 'component-funding-calculator.png'), Buffer.from(shot.data, 'base64'));
    console.log('✓ Captured component-funding-calculator.png');

    ws.close();
  } finally {
    try {
      process.kill(chromeProc.pid);
    } catch (e) {}
  }
}

captureInteractive().catch(console.error);
