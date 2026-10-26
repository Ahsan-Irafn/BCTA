const fs = require('fs');

const htmlSA = fs.readFileSync('scripts/enrol-sa.html', 'utf-8');
const htmlWA = fs.readFileSync('scripts/enrol-wa.html', 'utf-8');

[
  { name: 'SA', html: htmlSA },
  { name: 'WA', html: htmlWA }
].forEach(({ name, html }) => {
  console.log(`\n=================== ${name} FORM ===================`);
  const formMatch = html.match(/<form[\s\S]*?<\/form>/i);
  if (formMatch) {
    const f = formMatch[0];
    const action = (f.match(/action="([^"]*)"/i) || [])[1];
    console.log('Action:', action);

    const inputs = (f.match(/<input[^>]*name="([^"]*)"[^>]*>/gi) || []).map(i => {
      const n = (i.match(/name="([^"]*)"/i) || [])[1];
      const t = (i.match(/type="([^"]*)"/i) || [])[1];
      const v = (i.match(/value="([^"]*)"/i) || [])[1];
      return `${n} (${t}) = ${v}`;
    });
    console.log('Inputs count:', inputs.length);
    inputs.forEach(inp => console.log('  ' + inp));

    // selects
    const selects = (f.match(/<select[^>]*name="([^"]*)"[\s\S]*?<\/select>/gi) || []).map(s => {
      const n = (s.match(/name="([^"]*)"/i) || [])[1];
      const opts = (s.match(/<option[^>]*>[\s\S]*?<\/option>/gi) || []).map(o => o.replace(/<[^>]+>/g, '').trim());
      return `${n}: ${opts.join(', ')}`;
    });
    console.log('Selects:');
    selects.forEach(sel => console.log('  ' + sel));
  } else {
    console.log('No <form> tag found');
  }
});
