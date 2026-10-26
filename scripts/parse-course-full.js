const fs = require('fs');
const path = require('path');

const files = ['cpc40120-sa', 'sit40721-sa', 'rii30820-sa', 'cpc30220-sa', 'cpc50220-wa'];

files.forEach(name => {
  const html = fs.readFileSync(path.join(__dirname, 'scraped-courses', `${name}.html`), 'utf-8');
  console.log(`\n======================================================`);
  console.log(`ANALYSIS FOR: ${name}`);
  console.log(`======================================================`);

  // Find text around common sections: "Course Overview", "Units", "Entry Requirements", "Fees", "Career", "Delivery"
  // Let's look for Elementor tabs or toggle titles
  const tabTitles = [];
  const tabRegex = /class="elementor-tab-title[^"]*"[^>]*>([\s\S]*?)<\/(?:a|div)>/gi;
  let tabMatch;
  while ((tabMatch = tabRegex.exec(html)) !== null) {
    tabTitles.push(tabMatch[1].replace(/<[^>]+>/g, '').trim());
  }
  console.log('Tabs / Accordion titles:', tabTitles);

  // Look for any table rows (often units are in <tr><td>...</td></tr>)
  const tables = [];
  const trRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let trMatch;
  let trCount = 0;
  const sampleTrs = [];
  while ((trMatch = trRegex.exec(html)) !== null) {
    trCount++;
    const rowText = trMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (rowText.length > 5 && sampleTrs.length < 35) {
      sampleTrs.push(rowText);
    }
  }
  console.log(`Total <tr> found: ${trCount}`);
  if (sampleTrs.length > 0) {
    console.log('Sample rows:');
    sampleTrs.slice(0, 15).forEach(r => console.log('  - ' + r));
  }

  // Look for paragraphs with substantial content
  const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  let pMatch;
  const paras = [];
  while ((pMatch = pRegex.exec(html)) !== null) {
    const text = pMatch[1].replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
    if (text.length > 40 && !text.includes('WordPress') && !text.includes('Elementor') && !text.includes('cookie')) {
      paras.push(text);
    }
  }
  console.log(`Total informative <p> found: ${paras.length}`);
  console.log('First 6 informative <p>:');
  paras.slice(0, 6).forEach((p, idx) => console.log(`  [${idx+1}] ${p.substring(0, 160)}...`));
});
