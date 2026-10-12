const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

async function captureTrustindex() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--remote-debugging-port=9235',
    'http://localhost:3005/south-australia',
  ]);

  await new Promise((r) => setTimeout(r, 4000));

  try {
    const list = await new Promise((resolve, reject) => {
      http.get('http://127.0.0.1:9235/json/list', (res) => {
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
    await send('DOM.enable');

    console.log('Waiting for Trustindex widget to appear in DOM...');
    let widgetReady = false;
    for (let i = 0; i < 15; i++) {
      const evalRes = await send('Runtime.evaluate', {
        expression: `({
          hasSection: !!document.getElementById('student-reviews'),
          widgetCount: document.querySelectorAll('.ti-widget').length,
          reviewsCount: document.querySelectorAll('.ti-review-item').length,
          sectionText: document.getElementById('student-reviews')?.innerText?.slice(0, 100)
        })`,
        returnByValue: true
      });
      console.log(`Poll ${i}:`, evalRes.result?.value);
      if (evalRes.result?.value?.widgetCount > 0) {
        widgetReady = true;
        break;
      }
      await new Promise((r) => setTimeout(r, 1000));
    }

    const brainDir = 'C:\\Users\\Ahsan\\.gemini\\antigravity-ide\\brain\\c1ef504d-45c5-4c5d-a74d-8f8fe1cb4d2e';

    // 1. Desktop 1440px
    console.log('Capturing Desktop 1440px...');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 1050,
      deviceScaleFactor: 1,
      mobile: false,
    });

    // Scroll to the student reviews section
    await send('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('student-reviews');
        if (el) {
          el.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
      `
    });
    await new Promise((r) => setTimeout(r, 1500));

    // Capture screenshot of viewport
    const desktopShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(brainDir, 'trustindex-desktop.png'), Buffer.from(desktopShot.data, 'base64'));
    console.log('Saved trustindex-desktop.png');

    // Also get clip of the exact section if possible
    const boxRes = await send('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('student-reviews');
        if (el) {
          const rect = el.getBoundingClientRect();
          ({ x: rect.x + window.scrollX, y: rect.y + window.scrollY, width: rect.width, height: Math.min(rect.height, 900) });
        } else null;
      `,
      returnByValue: true
    });
    if (boxRes.result?.value) {
      const clip = boxRes.result.value;
      const sectionShot = await send('Page.captureScreenshot', {
        format: 'png',
        clip: { x: 0, y: clip.y, width: 1440, height: clip.height, scale: 1 }
      });
      fs.writeFileSync(path.join(brainDir, 'trustindex-section-desktop.png'), Buffer.from(sectionShot.data, 'base64'));
      console.log('Saved trustindex-section-desktop.png');
    }

    // 2. Mobile 390px (iPhone 14)
    console.log('Capturing Mobile 390px...');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });

    await send('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('student-reviews');
        if (el) {
          el.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
      `
    });
    await new Promise((r) => setTimeout(r, 1500));

    const mobileShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(brainDir, 'trustindex-mobile.png'), Buffer.from(mobileShot.data, 'base64'));
    console.log('Saved trustindex-mobile.png');

    // Check for any horizontal overflow on mobile
    const overflowCheck = await send('Runtime.evaluate', {
      expression: `({
        docWidth: document.documentElement.scrollWidth,
        winWidth: window.innerWidth,
        hasHorizontalScroll: document.documentElement.scrollWidth > window.innerWidth,
        sectionWidth: document.getElementById('student-reviews')?.offsetWidth
      })`,
      returnByValue: true
    });
    console.log('Mobile overflow check:', overflowCheck.result?.value);

    // 3. Test Navigation: Navigate to /western-australia and return to /south-australia
    console.log('Testing client navigation and returning...');
    await send('Page.navigate', { url: 'http://localhost:3005/western-australia' });
    await new Promise((r) => setTimeout(r, 2500));
    await send('Page.navigate', { url: 'http://localhost:3005/south-australia' });
    await new Promise((r) => setTimeout(r, 3000));

    const navCheck = await send('Runtime.evaluate', {
      expression: `({
        widgetCount: document.querySelectorAll('.ti-widget').length,
        reviewsCount: document.querySelectorAll('.ti-review-item').length
      })`,
      returnByValue: true
    });
    console.log('Post-navigation check on /south-australia:', navCheck.result?.value);

    ws.close();
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    chromeProc.kill();
  }
}

captureTrustindex().then(() => console.log('Finished Trustindex QA check.'));
