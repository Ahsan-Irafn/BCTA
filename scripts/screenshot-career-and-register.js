const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

async function testAndCapture() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--remote-debugging-port=9240',
    'http://localhost:3005/south-australia',
  ]);

  await new Promise((r) => setTimeout(r, 4000));

  try {
    const list = await new Promise((resolve, reject) => {
      http.get('http://127.0.0.1:9240/json/list', (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => resolve(JSON.parse(data)));
      }).on('error', reject);
    });

    const target = list.find((t) => t.type === 'page' && t.url.includes('south-australia')) || list[0];
    if (!target) throw new Error('No page target found');

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

    const brainDir = 'C:\\Users\\Ahsan\\.gemini\\antigravity-ide\\brain\\c1ef504d-45c5-4c5d-a74d-8f8fe1cb4d2e';

    // 1. Verify Zoho form attributes and payload structure in DOM
    const zohoAudit = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const form = document.getElementById('webform5571336000116229005');
          if (!form) return { error: 'Form not found' };

          const hiddenFields = {};
          form.querySelectorAll('input[type="hidden"]').forEach(inp => {
            hiddenFields[inp.name] = inp.value;
          });

          const visibleInputs = Array.from(form.querySelectorAll('input:not([type="hidden"]), select')).map(el => ({
            name: el.name,
            id: el.id,
            tagName: el.tagName,
            type: el.type,
            required: el.getAttribute('aria-required'),
            maxlength: el.getAttribute('maxlength')
          }));

          return {
            formId: form.id,
            formName: form.name,
            action: form.action,
            method: form.method,
            acceptCharset: form.getAttribute('accept-charset'),
            hiddenFields,
            visibleFieldsCount: visibleInputs.length,
            visibleInputs
          };
        })()
      `,
      returnByValue: true
    });
    console.log('=== ZOHO FORM DOM AUDIT ===');
    console.log(JSON.stringify(zohoAudit.result?.value, null, 2));

    // 2. Desktop 1440px - Career Outlook Section
    console.log('\n--- Capturing Desktop Career Outlook ---');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 1050,
      deviceScaleFactor: 1,
      mobile: false,
    });

    await send('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('career-outlook');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      `
    });
    // Wait for counter animation to finish
    await new Promise((r) => setTimeout(r, 2200));

    // Check final animated counter values
    const counterValues = await send('Runtime.evaluate', {
      expression: `
        Array.from(document.querySelectorAll('#career-outlook span[aria-hidden="true"]'))
          .map(el => el.innerText.trim())
          .filter(t => t.length > 0 && (t.includes('2,400') || t.includes('9.2%') || t.includes('$130K') || t.includes('4.1')))
      `,
      returnByValue: true
    });
    console.log('Animated Counter Terminal Values:', counterValues.result?.value);

    const shot1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(brainDir, 'career-outlook-desktop.png'), Buffer.from(shot1.data, 'base64'));
    console.log('Saved career-outlook-desktop.png');

    // 3. Desktop 1440px - Register Now Section
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 1250,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await send('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('register-now');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
      `
    });
    await new Promise((r) => setTimeout(r, 1200));

    const shot2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(brainDir, 'register-now-desktop.png'), Buffer.from(shot2.data, 'base64'));
    console.log('Saved register-now-desktop.png');

    // 4. Test Client Validation: Click submit without filling form
    console.log('\n--- Testing Client Validation (Empty Submit) ---');
    await send('Runtime.evaluate', {
      expression: `
        const submitBtn = document.getElementById('formsubmit');
        if (submitBtn) submitBtn.click();
      `
    });
    await new Promise((r) => setTimeout(r, 800));

    const validationAudit = await send('Runtime.evaluate', {
      expression: `
        Array.from(document.querySelectorAll('#register-now [role="alert"]')).map(el => el.innerText.trim())
      `,
      returnByValue: true
    });
    console.log('Validation Error Messages Displayed:', validationAudit.result?.value);

    const shotVal = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(brainDir, 'register-now-validation.png'), Buffer.from(shotVal.data, 'base64'));
    console.log('Saved register-now-validation.png');

    // 5. Mobile 390px - Career Outlook
    console.log('\n--- Capturing Mobile Career Outlook ---');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });

    await send('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('career-outlook');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      `
    });
    await new Promise((r) => setTimeout(r, 1200));

    const shotMobile1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(brainDir, 'career-outlook-mobile.png'), Buffer.from(shotMobile1.data, 'base64'));
    console.log('Saved career-outlook-mobile.png');

    // 6. Mobile 390px - Register Now Form
    console.log('\n--- Capturing Mobile Register Now Form ---');
    await send('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('webform5571336000116229005');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      `
    });
    await new Promise((r) => setTimeout(r, 1200));

    const shotMobile2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(brainDir, 'register-now-mobile.png'), Buffer.from(shotMobile2.data, 'base64'));
    console.log('Saved register-now-mobile.png');

    // Check mobile horizontal scroll
    const mobileCheck = await send('Runtime.evaluate', {
      expression: `({
        docWidth: document.documentElement.scrollWidth,
        winWidth: window.innerWidth,
        hasHorizontalScroll: document.documentElement.scrollWidth > window.innerWidth
      })`,
      returnByValue: true
    });
    console.log('Mobile Overflow Check:', mobileCheck.result?.value);

    ws.close();
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    chromeProc.kill();
  }
}

testAndCapture().then(() => console.log('\nQA and Screenshots Complete!'));
