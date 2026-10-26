const https = require('https');
const fs = require('fs');

const url = 'https://bcta.edu.au/wp-content/uploads/2026/08/pngwing.com_.png';
const dest = 'z:/next jss/public/images/nrt-logo.png';

const file = fs.createWriteStream(dest);
https.get(url, (res) => {
  if (res.statusCode === 200) {
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log('Downloaded NRT logo successfully:', fs.statSync(dest).size, 'bytes');
    });
  } else {
    console.log('Failed to download NRT logo, status:', res.statusCode);
  }
}).on('error', (err) => {
  console.error('Error downloading:', err.message);
});
