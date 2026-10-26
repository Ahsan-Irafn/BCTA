const fs = require('fs');
const path = require('path');

const srcPath = 'C:\\Users\\Ahsan\\.gemini\\antigravity-ide\\brain\\e2155659-e567-44e0-9dd2-39a6909cf0b4\\.system_generated\\steps\\1087\\content.md';
const content = fs.readFileSync(srcPath, 'utf8');

console.log('Total Length:', content.length);

// Extract headings
const headings = content.match(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/gi) || [];
console.log('\n--- HEADINGS (' + headings.length + ') ---');
headings.forEach(h => console.log(h.replace(/<[^>]+>/g, '').trim()));

// Check for text patterns
function findSections(regex, label) {
  console.log('\n--- ' + label + ' ---');
  let match;
  while ((match = regex.exec(content)) !== null) {
    const text = match[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log(text.slice(0, 300));
  }
}

// Write a clean text extract for easy inspection
const cleanText = content
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/<[^>]+>/g, '\n')
  .split('\n')
  .map(l => l.trim())
  .filter(l => l.length > 0)
  .join('\n');

fs.writeFileSync('z:\\next jss\\scripts\\extracted-course-text.txt', cleanText, 'utf8');
console.log('\nWrote clean text to z:\\next jss\\scripts\\extracted-course-text.txt, lines:', cleanText.split('\n').length);
