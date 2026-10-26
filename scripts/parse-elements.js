const fs = require('fs');

const sa = fs.readFileSync('scripts/sa.html', 'utf8');
const home = fs.readFileSync('scripts/home.html', 'utf8');

console.log('=== HEADER IN HOME ===');
const headerHomeMatch = home.match(/<header[\s\S]*?<\/header>/i);
console.log(headerHomeMatch ? headerHomeMatch[0].substring(0, 1000) : 'No header tag in home');

console.log('=== HEADER IN SA ===');
const headerSAMatch = sa.match(/<header[\s\S]*?<\/header>/i);
console.log(headerSAMatch ? headerSAMatch[0].substring(0, 1000) : 'No header tag in sa');

console.log('=== FOOTER IN HOME ===');
const footerHomeMatch = home.match(/<footer[\s\S]*?<\/footer>/i);
console.log(footerHomeMatch ? footerHomeMatch[0].substring(0, 1000) : 'No footer tag in home');

console.log('=== FOOTER IN SA ===');
const footerSAMatch = sa.match(/<footer[\s\S]*?<\/footer>/i);
console.log(footerSAMatch ? footerSAMatch[0].substring(0, 1000) : 'No footer tag in sa');

// Let's search for "King William" in sa.html
console.log('=== KING WILLIAM SEARCH IN SA ===');
const kwIndices = [];
let idx = sa.indexOf('King William');
while (idx !== -1) {
  kwIndices.push(idx);
  idx = sa.indexOf('King William', idx + 1);
}
console.log('Found occurrences:', kwIndices.length);
kwIndices.forEach((pos, i) => {
  console.log(`[${i}] snippet:`, sa.substring(pos - 150, pos + 250));
});

// Search for "Register Now" or "webform" in sa.html
console.log('=== REGISTER NOW SEARCH IN SA ===');
let regIdx = sa.indexOf('Register now');
if (regIdx === -1) regIdx = sa.indexOf('Register Now');
if (regIdx !== -1) {
  console.log('Register snippet:', sa.substring(regIdx - 100, regIdx + 400));
}
