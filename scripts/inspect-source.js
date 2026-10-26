const https = require('https');

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
  try {
    const htmlHome = await get('https://bcta.edu.au/');
    console.log('--- HOME (https://bcta.edu.au/) ---');
    console.log('Title:', htmlHome.match(/<title>(.*?)<\/title>/)?.[1]);
    console.log('Has header?', htmlHome.includes('<header'));
    console.log('Has footer?', htmlHome.includes('<footer'));
    console.log('Length:', htmlHome.length);

    const htmlSA = await get('https://bcta.edu.au/south-australia/');
    console.log('\n--- SA (https://bcta.edu.au/south-australia/) ---');
    console.log('Title:', htmlSA.match(/<title>(.*?)<\/title>/)?.[1]);
    console.log('Has header?', htmlSA.includes('<header'));
    console.log('Has footer?', htmlSA.includes('<footer'));
    console.log('Length:', htmlSA.length);
  } catch (err) {
    console.error('Error fetching:', err);
  }
})();
