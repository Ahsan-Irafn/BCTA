const fs = require('fs');
const sa = fs.readFileSync('scripts/sa.html', 'utf8');

const start = sa.indexOf('id="enq1"');
const formStart = sa.indexOf('id="webform5571336000116229005"');
console.log(sa.substring(start, formStart));
