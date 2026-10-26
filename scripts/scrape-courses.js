const https = require('https');
const fs = require('fs');
const path = require('path');

const urls = [
  {
    id: 'cpc40120-sa',
    state: 'sa',
    slug: 'certificate-iv-in-building-construction-building-south-australia',
    url: 'https://bcta.edu.au/courses/certificate-iv-in-building-construction-building-south-australia/'
  },
  {
    id: 'sit40721-sa',
    state: 'sa',
    slug: 'sit40721-certificate-iv-in-patisserie-south-australia',
    url: 'https://bcta.edu.au/courses/sit40721-certificate-iv-in-patisserie-south-australia/'
  },
  {
    id: 'rii30820-sa',
    state: 'sa',
    slug: 'certificate-iii-in-civil-construction-plant-operations-south-australia',
    url: 'https://bcta.edu.au/courses/certificate-iii-in-civil-construction-plant-operations-south-australia/'
  },
  {
    id: 'cpc30220-sa',
    state: 'sa',
    slug: 'certificate-iii-in-carpentry-south-australia',
    url: 'https://bcta.edu.au/courses/certificate-iii-in-carpentry-south-australia/'
  },
  {
    id: 'cpc50220-wa',
    state: 'wa',
    slug: 'diploma-of-building-and-construction-western-australia',
    url: 'https://bcta.edu.au/courses/diploma-of-building-and-construction-western-australia/'
  }
];

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function cleanText(text) {
  if (!text) return '';
  return text
    .replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '')
    .replace(/<style[^>]*>([\S\s]*?)<\/style>/gmi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8211;/g, '-')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

async function run() {
  const outputDir = path.join(__dirname, 'scraped-courses');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  for (const item of urls) {
    console.log(`Fetching ${item.id} from ${item.url}...`);
    const html = await fetch(item.url);
    fs.writeFileSync(path.join(outputDir, `${item.id}.html`), html);

    // Basic extraction
    // Match h1
    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const h1 = h1Match ? cleanText(h1Match[1]) : '';

    // Match all h2, h3, and their following paragraphs or lists
    const sections = [];
    const headingRegex = /<h([2-4])[^>]*>([\s\S]*?)<\/h\1>/gi;
    let match;
    let lastIndex = 0;
    const headings = [];
    while ((match = headingRegex.exec(html)) !== null) {
      headings.push({
        level: match[1],
        title: cleanText(match[2]),
        index: match.index,
        endIndex: headingRegex.lastIndex
      });
    }

    // Units table or list
    // Usually unit codes match [A-Z]{3,4}[0-9]{3,5}[A-Z]?
    const unitRegex = /([A-Z]{3,4}[0-9]{3,5}[A-Z]?)\s*[-–:]?\s*([^<\n\r]+)/g;

    fs.writeFileSync(path.join(outputDir, `${item.id}-headings.json`), JSON.stringify({
      url: item.url,
      h1,
      headings: headings.map(h => ({ level: h.level, title: h.title }))
    }, null, 2));

    console.log(`Saved ${item.id} raw & headings (${headings.length} headings found).`);
  }
}

run().catch(console.error);
