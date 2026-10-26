const https = require('https');
const fs = require('fs');

function getPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(d));
    }).on('error', reject);
  });
}

function clean(str) {
  return str.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

async function run() {
  const sa = await getPage('https://bcta.edu.au/south-australia/');
  const wa = await getPage('https://bcta.edu.au/western-australia/');

  fs.writeFileSync('scripts/sa.html', sa);
  fs.writeFileSync('scripts/wa.html', wa);

  console.log('Saved sa.html & wa.html');

  // Find header area: usually between <header or class="ehf-header"
  // And footer area: usually class="ehf-footer" or <footer
  function extractNav(html, label) {
    console.log(`\n======================================================`);
    console.log(`NAV & HEADER FOR: ${label}`);
    console.log(`======================================================`);

    const headerMatch = html.match(/<header[^>]*>([\s\S]*?)<\/header>/i);
    const headerHtml = headerMatch ? headerMatch[1] : html.substring(0, 50000);

    const aRegex = /<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
    let m;
    const links = [];
    while ((m = aRegex.exec(headerHtml)) !== null) {
      const text = clean(m[2]);
      const href = m[1];
      if (text.length > 0 && text.length < 70 && !links.some(l => l.text === text && l.href === href)) {
        links.push({ text, href });
      }
    }
    links.forEach(l => console.log(`  ${l.text} -> ${l.href}`));
  }

  function extractFooter(html, label) {
    console.log(`\n======================================================`);
    console.log(`FOOTER FOR: ${label}`);
    console.log(`======================================================`);

    const footerMatch = html.match(/<footer[^>]*>([\s\S]*?)<\/footer>/i);
    const footerHtml = footerMatch ? footerMatch[1] : '';

    if (!footerHtml) {
      console.log('No <footer> tag found, checking last 60k chars');
    }

    const searchArea = footerHtml || html.substring(html.length - 80000);
    const aRegex = /<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
    let m;
    const links = [];
    while ((m = aRegex.exec(searchArea)) !== null) {
      const text = clean(m[2]);
      const href = m[1];
      if (text.length > 0 && text.length < 80 && !links.some(l => l.text === text && l.href === href)) {
        links.push({ text, href });
      }
    }
    console.log(`Found ${links.length} links in footer area:`);
    links.slice(0, 25).forEach(l => console.log(`  ${l.text} -> ${l.href}`));

    // Also look for address text in footer area
    const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
    let pm;
    console.log('\nAddress / text blocks in footer:');
    while ((pm = pRegex.exec(searchArea)) !== null) {
      const t = clean(pm[1]);
      if (t.toLowerCase().includes('office') || t.toLowerCase().includes('street') || t.toLowerCase().includes('adelaide') || t.toLowerCase().includes('perth') || t.toLowerCase().includes('leederville') || t.toLowerCase().includes('rto') || t.toLowerCase().includes('king william') || t.toLowerCase().includes('carr pl')) {
        console.log(`  [P] ${t}`);
      }
    }
  }

  extractNav(sa, 'SOUTH AUSTRALIA');
  extractNav(wa, 'WESTERN AUSTRALIA');

  extractFooter(sa, 'SOUTH AUSTRALIA');
  extractFooter(wa, 'WESTERN AUSTRALIA');
}

run().catch(console.error);
