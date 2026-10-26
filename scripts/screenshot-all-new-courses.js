const puppeteer = require('puppeteer');
const path = require('path');

const targets = [
  {
    name: 'course-cpc40120-sa',
    url: 'http://localhost:3000/courses/certificate-iv-in-building-construction-building-south-australia'
  },
  {
    name: 'course-sit40721-sa',
    url: 'http://localhost:3000/courses/sit40721-certificate-iv-in-patisserie-south-australia'
  },
  {
    name: 'course-rii30820-sa',
    url: 'http://localhost:3000/courses/certificate-iii-in-civil-construction-plant-operations-south-australia'
  },
  {
    name: 'course-cpc30220-sa',
    url: 'http://localhost:3000/courses/certificate-iii-in-carpentry-south-australia'
  },
  {
    name: 'course-cpc50220-wa',
    url: 'http://localhost:3000/courses/diploma-of-building-and-construction-western-australia'
  },
  {
    name: 'page-western-australia',
    url: 'http://localhost:3000/western-australia'
  }
];

async function capture() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const artifactsDir = 'C:\\Users\\Ahsan\\.gemini\\antigravity-ide\\brain\\e2155659-e567-44e0-9dd2-39a6909cf0b4';

  for (const item of targets) {
    console.log(`Navigating to ${item.url}...`);
    await page.goto(item.url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1500));

    // Hero preview
    const heroPath = path.join(artifactsDir, `${item.name}-hero.png`);
    await page.screenshot({ path: heroPath, clip: { x: 0, y: 0, width: 1440, height: 850 } });
    console.log(`Saved ${heroPath}`);

    // If course page, also screenshot units and delivery
    if (item.name.startsWith('course-')) {
      const unitsPath = path.join(artifactsDir, `${item.name}-units-delivery.png`);
      const unitsEl = await page.$('#course-units');
      if (unitsEl) {
        await unitsEl.scrollIntoView();
        await new Promise(r => setTimeout(r, 600));
        await page.screenshot({ path: unitsPath, clip: { x: 0, y: 1100, width: 1440, height: 1100 } });
        console.log(`Saved ${unitsPath}`);
      }
    }
  }

  await browser.close();
  console.log('Finished capturing all snapshots!');
}

capture().catch(console.error);
