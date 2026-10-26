const fs = require('fs');

const sa = fs.readFileSync('scripts/enrol-sa.html', 'utf-8');
const wa = fs.readFileSync('scripts/enrol-wa.html', 'utf-8');

function clean(str) {
  return str.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function dump(html, name) {
  console.log(`\n================= ${name} =================`);
  const widgetRegex = /class="elementor-widget-container">([\s\S]*?)<\/div>/gi;
  let m;
  const items = [];
  while ((m = widgetRegex.exec(html)) !== null) {
    const raw = clean(m[1].replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ''));
    if (raw.length > 5 && !raw.includes('function(') && !items.includes(raw)) {
      items.push(raw);
    }
  }
  items.forEach((item, idx) => console.log(`[${idx}] ${item.substring(0, 160)}`));
}

dump(sa, 'SA ENROL');
dump(wa, 'WA ENROL');
