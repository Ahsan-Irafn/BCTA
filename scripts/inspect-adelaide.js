const fs = require('fs');
const sa = fs.readFileSync('scripts/sa.html', 'utf8');

const pos = sa.indexOf('Lvl 30/91 King William St');
console.log('=== ADELAIDE LOCATION SECTION IN SA.HTML ===');
console.log(sa.substring(pos - 600, pos + 800));
