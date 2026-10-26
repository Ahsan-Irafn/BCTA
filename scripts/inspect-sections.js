const fs = require('fs');
const home = fs.readFileSync('scripts/home.html', 'utf8');
const sa = fs.readFileSync('scripts/sa.html', 'utf8');

console.log('=== SECTIONS IN HOME.HTML ===');
const homeSections = home.match(/<section[\s\S]*?<\/section>/gi) || [];
console.log('Home sections count:', homeSections.length);
homeSections.forEach((s, i) => {
  const h = s.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i);
  console.log(`Home Sec ${i}:`, h ? h[1].replace(/<[^>]+>/g, '').trim() : 'No heading');
});

console.log('\n=== SECTIONS IN SA.HTML ===');
const saSections = sa.match(/<section[\s\S]*?<\/section>/gi) || [];
console.log('SA sections count:', saSections.length);
saSections.forEach((s, i) => {
  const h = s.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i);
  console.log(`SA Sec ${i}:`, h ? h[1].replace(/<[^>]+>/g, '').trim() : 'No heading');
});
