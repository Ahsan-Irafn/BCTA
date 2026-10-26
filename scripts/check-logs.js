const http = require('http');
const { spawn } = require('child_process');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--remote-debugging-port=9222',
    'http://localhost:3005/',
  ]);

  await new Promise((r) => setTimeout(r, 2000));

  try {
    const list = await new Promise((resolve, reject) => {
      http.get('http://127.0.0.1:9222/json/list', (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => resolve(JSON.parse(data)));
      }).on('error', reject);
    });

    const target = list.find((t) => t.type === 'page' && t.url.includes('localhost:3005')) || list[0];
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

    await send('Runtime.enable');
    await send('Log.enable');

    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Log.entryAdded' || msg.method === 'Runtime.consoleAPICalled') {
        console.log('LOG:', JSON.stringify(msg.params));
      }
    });

    await send('Page.navigate', { url: 'http://localhost:3005/' });
    await new Promise((r) => setTimeout(r, 4000));

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

main().catch(console.error);
