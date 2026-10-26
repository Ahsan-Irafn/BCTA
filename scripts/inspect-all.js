const fs = require('fs');
const path = require('path');

const files = [
  { key: 'cpc40120-sa', name: 'CPC40120 Certificate IV in Building & Construction (Building) SA' },
  { key: 'sit40721-sa', name: 'SIT40721 Certificate IV in Patisserie SA' },
  { key: 'rii30820-sa', name: 'RII30820 Certificate III in Civil Construction Plant Operations SA' },
  { key: 'cpc30220-sa', name: 'CPC30220 Certificate III in Carpentry SA' },
  { key: 'cpc50220-wa', name: 'CPC50220 Diploma of Building and Construction (Building) WA' }
];

const results = {};

files.forEach(({ key, name }) => {
  const html = fs.readFileSync(path.join(__dirname, 'scraped-courses', key + '.html'), 'utf-8');
  
  // Extract all tables
  const tableMatches = html.match(/<table[^>]*>[\s\S]*?<\/table>/gi) || [];
  const tables = tableMatches.map(tbl => {
    return (tbl.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi) || []).map(r => {
      return (r.match(/<t[dh][^>]*>[\s\S]*?<\/t[dh]>/gi) || []).map(c => 
        c.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
      );
    });
  });

  // Extract clean text paragraphs
  const pMatches = (html.match(/<p[^>]*>[\s\S]*?<\/p>/gi) || []).map(p =>
    p.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()
  ).filter(t => t.length > 25 && !t.includes('{') && !t.includes('Elementor') && !t.includes('WordPress'));

  // Extract headings
  const hMatches = (html.match(/<h[1-4][^>]*>[\s\S]*?<\/h[1-4]>/gi) || []).map(h =>
    h.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  );

  results[key] = {
    name,
    tables,
    headings: hMatches,
    paragraphs: pMatches
  };
});

fs.writeFileSync(path.join(__dirname, 'scraped-courses', 'extracted-all.json'), JSON.stringify(results, null, 2));
console.log('Successfully saved extracted-all.json');
