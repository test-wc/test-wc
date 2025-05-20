import fs from 'fs';
import path from 'path';

const iconDir = path.join('assets', 'svg');
const icons = {};
const files = fs.readdirSync(iconDir);
const iconTSPath = path.join('src', 'components', 'icon', 'icons.ts');

console.log('🌉 Generating icons for Icon component...');

files.forEach((file) => {
  icons[file.replace('.svg', '').replace('it-', '')] = fs.readFileSync(
    path.join(iconDir, file),
    'utf8'
  );
});

const iconsTS = `
export const ICONS_LIST : any = 
    ${JSON.stringify(icons, null, 2)}
`;

fs.writeFileSync(iconTSPath, iconsTS, 'utf8');

console.log(`✅ Done! ${Object.keys(icons).length} icons generated!`);
