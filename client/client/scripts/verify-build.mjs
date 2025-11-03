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