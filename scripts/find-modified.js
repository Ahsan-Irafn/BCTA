const fs = require('fs');
const readline = require('readline');

const file = 'C:/Users/Ahsan/.gemini/antigravity-ide/brain/e2155659-e567-44e0-9dd2-39a6909cf0b4/.system_generated/logs/transcript.jsonl';
const rl = readline.createInterface({ input: fs.createReadStream(file) });
let count = 0;
const modified = [];

rl.on('line', (line) => {
  count++;
  if (count > 2534) {
    try {
      const obj = JSON.parse(line);
      if (obj.tool_calls) {
        for (const tc of obj.tool_calls) {
          if (tc.name === 'replace_file_content' || tc.name === 'write_to_file' || tc.name === 'multi_replace_file_content') {
            modified.push({ name: tc.name, file: tc.args && tc.args.TargetFile });
          }
        }
      }
    } catch (e) {}
  }
});

rl.on('close', () => {
  console.log('Modified files count:', modified.length);
  for (const m of modified) {
    console.log(m.name, '->', m.file);
  }
});
