<<<<<<< HEAD
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

const distDir = resolve('./dist');
const indexPath = resolve(distDir, 'index.html');

// Check if dist directory exists
if (!existsSync(distDir)) {
  console.error('Error: dist directory not found!');
  process.exit(1);
}

// Check if index.html exists
if (!existsSync(indexPath)) {
  console.error('Error: dist/index.html not found!');
  process.exit(1);
}

// Read index.html and check for source references
const indexContent = readFileSync(indexPath, 'utf-8');
if (indexContent.includes('src="/src/main.tsx"')) {
  console.error('Error: index.html still contains development source references!');
  process.exit(1);
}

console.log('✅ Build verification passed!');
process.exit(0);
=======
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
>>>>>>> 23d607663cb2d349b7a7c807a30e6a3e22d99d84
