import { readFileSync } from 'fs';
const code = readFileSync('src/App.jsx', 'utf8');
const lines = code.split('\n');
let depth = 0;
let appStart = -1;
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (l.includes('export default function App')) {
    appStart = i;
    depth = 0;
  }
  if (appStart >= 0) {
    for (const c of l) {
      if (c === '{') depth++;
      if (c === '}') depth--;
    }
    if (depth === 0 && appStart >= 0 && i > appStart) {
      console.log('App closes at line ' + (i + 1));
      break;
    }
  }
}
