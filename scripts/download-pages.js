const https = require('https');
const fs = require('fs');

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

(async () => {
  const htmlHome = await get('https://bcta.edu.au/');
  fs.writeFileSync('scripts/home.html', htmlHome);
  
  const htmlSA = await get('https://bcta.edu.au/south-australia/');
  fs.writeFileSync('scripts/sa.html', htmlSA);

  console.log('Saved home.html and sa.html');
})();
