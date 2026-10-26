const fs = require('fs');
const sa = fs.readFileSync('scripts/sa.html', 'utf8');

// Find all menus and links in header
const headerMatch = sa.match(/<header[\s\S]*?<\/header>/i);
if (headerMatch) {
  const headerHtml = headerMatch[0];
  console.log('=== HEADER NAV LINKS ===');
  const links = headerHtml.match(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi) || [];
  links.forEach(l => {
    const href = l.match(/href="([^"]*)"/)?.[1];
    const text = l.replace(/<[^>]+>/g, '').trim();
    if (text) {
      console.log(`Text: "${text}" | Href: ${href}`);
    }
  });
}

// Find footer links
const footerMatch = sa.match(/<footer[\s\S]*?<\/footer>/i);
if (footerMatch) {
  const footerHtml = footerMatch[0];
  console.log('\n=== FOOTER LINKS ===');
  const links = footerHtml.match(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi) || [];
  links.forEach(l => {
    const href = l.match(/href="([^"]*)"/)?.[1];
    const text = l.replace(/<[^>]+>/g, '').trim();
    if (text) {
      console.log(`Text: "${text}" | Href: ${href}`);
    }
  });
}
