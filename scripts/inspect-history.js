const fs = require('fs');

const transcriptPath = 'C:/Users/Ahsan/.gemini/antigravity-ide/brain/e2155659-e567-44e0-9dd2-39a6909cf0b4/.system_generated/logs/transcript_full.jsonl';
const lines = fs.readFileSync(transcriptPath, 'utf8').split('\n');

const targets = ['RegionalStatePage.tsx', 'RegionalStatePage.module.css', 'Header.tsx', 'Header.module.css'];

for (const target of targets) {
  console.log(`\n=== All edits to ${target} up to 2530 ===`);
  for (let i = 0; i <= 2530; i++) {
    if (lines[i] && lines[i].includes(target)) {
      const obj = JSON.parse(lines[i]);
      if (obj.tool_calls) {
        for (const tc of obj.tool_calls) {
          if (tc.name === 'write_to_file' || tc.name === 'replace_file_content' || tc.name === 'multi_replace_file_content') {
            console.log(`Line ${i}: ${tc.name}`);
          }
        }
      }
    }
  }
}
