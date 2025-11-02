// This file runs during Vercel build to verify the output
import fs from 'fs';
import path from 'path';

const distPath = path.resolve('./dist/public');
const indexPath = path.join(distPath, 'index.html');

if (!fs.existsSync(distPath)) {
  console.error('Error: dist/public directory not found!');
  process.exit(1);
}

if (!fs.existsSync(indexPath)) {
  console.error('Error: dist/public/index.html not found!');
  process.exit(1);
}

const indexContent = fs.readFileSync(indexPath, 'utf-8');
if (indexContent.includes('src="/src/main.tsx"')) {
  console.error('Error: index.html still references source files instead of built assets!');
  process.exit(1);
}

console.log('Build verification passed! ✅');