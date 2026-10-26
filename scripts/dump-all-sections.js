const fs = require('fs');
const path = require('path');

const files = [
  'cpc40120-sa',
  'sit40721-sa',
  'rii30820-sa',
  'cpc30220-sa',
  'cpc50220-wa'
];

files.forEach(f => {
  const html = fs.readFileSync(path.join(__dirname, 'scraped-courses', `${f}.html`), 'utf-8');
  console.log(`\n======================================================`);
  console.log(`SECTIONS IN ${f}`);
  console.log(`======================================================`);

  // Extract all text inside elementor-widget-heading or elementor-widget-text-editor
  const widgetRegex = /class="elementor-widget-container">([\s\S]*?)<\/div>/gi;
  let m;
  const items = [];
  while ((m = widgetRegex.exec(html)) !== null) {
    const raw = m[1].replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                    .replace(/<[^>]+>/g, ' ')
                    .replace(/&nbsp;/g, ' ')
                    .replace(/&#8211;/g, '-')
                    .replace(/&#8217;/g, "'")
                    .replace(/&#8220;/g, '"')
                    .replace(/&#8221;/g, '"')
                    .replace(/&amp;/g, '&')
                    .replace(/\s+/g, ' ')
                    .trim();
    if (raw.length > 5 && !raw.includes('function(') && !raw.includes('var ') && !raw.includes('{') && !items.includes(raw)) {
      items.push(raw);
    }
  }

  items.forEach((item, idx) => {
    if (item.length < 300) {
      console.log(`[${idx}] ${item}`);
    } else {
      console.log(`[${idx}] ${item.substring(0, 200)}...`);
    }
  });
});
