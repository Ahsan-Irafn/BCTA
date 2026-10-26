const fs = require('fs');

['enrol-sa.html', 'enrol-wa.html'].forEach(f => {
  const html = fs.readFileSync('scripts/' + f, 'utf-8');
  const sourceMatch = html.match(/name\s*=\s*['"]Lead Source['"][^>]*value\s*=\s*['"]([^'"]*)['"]/i);
  const leadcf14 = html.match(/name\s*=\s*['"]LEADCF14['"][^>]*value\s*=\s*['"]([^'"]*)['"]/i);
  console.log(f, 'Lead Source:', sourceMatch ? sourceMatch[1] : 'none', 'LEADCF14:', leadcf14 ? leadcf14[1] : 'none');
});
