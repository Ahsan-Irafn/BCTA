const fs = require('fs');
const { execSync } = require('child_process');

const transcriptPath = 'C:/Users/Ahsan/.gemini/antigravity-ide/brain/e2155659-e567-44e0-9dd2-39a6909cf0b4/.system_generated/logs/transcript_full.jsonl';
const lines = fs.readFileSync(transcriptPath, 'utf8').split('\n');

// 1. Header.module.css: line 713 write_to_file + line 1938 replace_file_content
const obj713 = JSON.parse(lines[713]);
const tc713 = obj713.tool_calls.find(t => t.args && t.args.TargetFile && t.args.TargetFile.includes('Header.module.css'));
let headerCss = tc713.args.CodeContent;

const obj1938 = JSON.parse(lines[1938]);
const tc1938 = obj1938.tool_calls.find(t => t.name === 'replace_file_content' && t.args.TargetFile.includes('Header.module.css'));
if (tc1938) {
  headerCss = headerCss.replace(tc1938.args.TargetContent, tc1938.args.ReplacementContent);
}
fs.writeFileSync('z:/next jss/src/components/layout/Header.module.css', headerCss, 'utf8');
console.log('✓ Restored Header.module.css (lines 713 + 1938)');

// 2. Header.tsx: line 1940 write_to_file + 2087 multi_replace + 2258 multi_replace
const obj1940 = JSON.parse(lines[1940]);
const tc1940 = obj1940.tool_calls.find(t => t.args && t.args.TargetFile && t.args.TargetFile.includes('Header.tsx'));
let headerTsx = tc1940.args.CodeContent;

const obj2087 = JSON.parse(lines[2087]);
const tc2087 = obj2087.tool_calls.find(t => t.name === 'multi_replace_file_content' && t.args.TargetFile.includes('Header.tsx'));
if (tc2087) {
  for (const chunk of tc2087.args.ReplacementChunks) {
    headerTsx = headerTsx.replace(chunk.TargetContent, chunk.ReplacementContent);
  }
}

const obj2258 = JSON.parse(lines[2258]);
const tc2258 = obj2258.tool_calls.find(t => t.name === 'multi_replace_file_content' && t.args.TargetFile.includes('Header.tsx'));
if (tc2258) {
  for (const chunk of tc2258.args.ReplacementChunks) {
    headerTsx = headerTsx.replace(chunk.TargetContent, chunk.ReplacementContent);
  }
}
fs.writeFileSync('z:/next jss/src/components/layout/Header.tsx', headerTsx, 'utf8');
console.log('✓ Restored Header.tsx (lines 1940 + 2087 + 2258)');

// 3. RegionalStatePage.module.css: git HEAD (8f33e83) + line 743 multi_replace
const headCss = execSync('git show 8f33e83:src/components/regional/RegionalStatePage.module.css', { cwd: 'z:/next jss' }).toString();
let regionalCss = headCss;
const obj743 = JSON.parse(lines[743]);
const tc743Css = obj743.tool_calls.find(t => t.name === 'multi_replace_file_content' && t.args.TargetFile.includes('RegionalStatePage.module.css'));
if (tc743Css) {
  for (const chunk of tc743Css.args.ReplacementChunks) {
    regionalCss = regionalCss.replace(chunk.TargetContent, chunk.ReplacementContent);
  }
}
fs.writeFileSync('z:/next jss/src/components/regional/RegionalStatePage.module.css', regionalCss, 'utf8');
console.log('✓ Restored RegionalStatePage.module.css (HEAD + line 743)');

// 4. RegionalStatePage.tsx: git HEAD (8f33e83) + lines [743, 749, 1114, 1116, 1118, 1792, 1796, 1800, 1946]
const headTsx = execSync('git show 8f33e83:src/components/regional/RegionalStatePage.tsx', { cwd: 'z:/next jss' }).toString();
let regionalTsx = headTsx;

const edits = [743, 749, 1114, 1116, 1118, 1792, 1796, 1800, 1946];
for (const lineNum of edits) {
  const obj = JSON.parse(lines[lineNum]);
  if (!obj.tool_calls) continue;
  for (const tc of obj.tool_calls) {
    if (tc.args && tc.args.TargetFile && tc.args.TargetFile.includes('RegionalStatePage.tsx')) {
      if (tc.name === 'replace_file_content') {
        regionalTsx = regionalTsx.replace(tc.args.TargetContent, tc.args.ReplacementContent);
        console.log(`  Applied line ${lineNum} (replace)`);
      } else if (tc.name === 'multi_replace_file_content') {
        for (const chunk of tc.args.ReplacementChunks) {
          regionalTsx = regionalTsx.replace(chunk.TargetContent, chunk.ReplacementContent);
        }
        console.log(`  Applied line ${lineNum} (multi-replace)`);
      }
    }
  }
}
fs.writeFileSync('z:/next jss/src/components/regional/RegionalStatePage.tsx', regionalTsx, 'utf8');
console.log('✓ Restored RegionalStatePage.tsx (HEAD + lines up to 1946)');

// 5. CourseTemplatePage.tsx: perspective tilt
let courseTemplate = fs.readFileSync('z:/next jss/src/components/course/CourseTemplatePage.tsx', 'utf8');
const obj2576 = JSON.parse(lines[2576]);
const tc2576 = obj2576.tool_calls.find(t => t.name === 'replace_file_content');
if (tc2576) {
  courseTemplate = courseTemplate.replace(tc2576.args.ReplacementContent, tc2576.args.TargetContent);
  fs.writeFileSync('z:/next jss/src/components/course/CourseTemplatePage.tsx', courseTemplate, 'utf8');
  console.log('✓ Restored CourseTemplatePage.tsx perspective tilt');
}
