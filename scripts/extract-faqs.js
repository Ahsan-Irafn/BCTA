const fs = require('fs');
const path = require('path');

const files = ['cpc40120-sa', 'sit40721-sa', 'rii30820-sa', 'cpc30220-sa', 'cpc50220-wa'];

files.forEach(f => {
  const html = fs.readFileSync(path.join(__dirname, 'scraped-courses', `${f}.html`), 'utf-8');
  console.log(`\n=================== ${f} FAQS ===================`);
  
  // Find where FAQ section is
  const faqIdx = html.toLowerCase().indexOf('frequently asked');
  if (faqIdx !== -1) {
    const faqChunk = html.substring(faqIdx, faqIdx + 15000);
    // Find all question/answer pairs or titles
    const regex = /<div class="elementor-tab-title[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<div class="elementor-tab-content[^"]*"[^>]*>([\s\S]*?)<\/div>/gi;
    let m;
    let count = 0;
    while ((m = regex.exec(faqChunk)) !== null) {
      count++;
      const q = m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      const a = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      console.log(`Q${count}: ${q}`);
      console.log(`A${count}: ${a}\n`);
    }
    if (count === 0) {
      // Try finding headings inside faqChunk
      const hRegex = /<h\d[^>]*>([\s\S]*?)<\/h\d>/gi;
      let hm;
      while ((hm = hRegex.exec(faqChunk)) !== null) {
        console.log('Heading in FAQ:', hm[1].replace(/<[^>]+>/g, '').trim());
      }
    }
  } else {
    console.log('No "frequently asked" found');
  }
});
