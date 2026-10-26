const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const targets = [
  {
    name: 'course-cpc40120-sa-hero',
    url: 'http://localhost:3000/courses/certificate-iv-in-building-construction-building-south-australia'
  },
  {
    name: 'course-sit40721-sa-hero',
    url: 'http://localhost:3000/courses/sit40721-certificate-iv-in-patisserie-south-australia'
  },
  {
    name: 'course-rii30820-sa-hero',
    url: 'http://localhost:3000/courses/certificate-iii-in-civil-construction-plant-operations-south-australia'
  },
  {
    name: 'course-cpc30220-sa-hero',
    url: 'http://localhost:3000/courses/certificate-iii-in-carpentry-south-australia'
  },
  {
    name: 'course-cpc50220-wa-hero',
    url: 'http://localhost:3000/courses/diploma-of-building-and-construction-western-australia'
  },
  {
    name: 'page-western-australia',
    url: 'http://localhost:3000/western-australia'
  }
];

async function capture() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9244;
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  const artifactsDir = 'C:\\Users\\Ahsan\\.gemini\\antigravity-ide\\brain\\e2155659-e567-44e0-9dd2-39a6909cf0b4';

  try {
    const list = await new Promise((resolve, reject) => {
      http.get(`http://127.0.0.1:${port}/json/list`, res => {
        let d = '';
        res.on('data', c => d += c);
        res.on('end', () => resolve(JSON.parse(d)));
      }).on('error', reject);
    });

    const target = list[0];
    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    let id = 1;
    function send(method, params = {}) {
      return new Promise(resolve => {
        const curId = id++;
        const handler = event => {
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
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    for (const item of targets) {
      console.log(`Navigating to ${item.url}...`);
      await send('Page.navigate', { url: item.url });
      await new Promise(r => setTimeout(r, 2500));

      const screenshot = await send('Page.captureScreenshot', {
        format: 'png',
        clip: { x: 0, y: 0, width: 1440, height: 950, scale: 1 }
      });

      if (screenshot && screenshot.data) {
        const buf = Buffer.from(screenshot.data, 'base64');
        const outPath = path.join(artifactsDir, `${item.name}.png`);
        fs.writeFileSync(outPath, buf);
        console.log(`Saved screenshot to: ${outPath}`);
      }
    }

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

capture().catch(console.error);
