import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');

const files = [
  '14 de agosto_Planta de primer piso  N 0.00 mts.png',
  '14 de agosto_Planta Sotano 01  N -3.65 mts.png',
  '14 de agosto_Planta Sotano 02  N -7.65 mts.png',
  '14 de agosto_Planta Sotano 03  N -11.30 mts.png'
];

async function convertAll() {
  for (const file of files) {
    const inputPath = path.join(publicDir, file);
    const outputPath = path.join(publicDir, file.replace('.png', '.webp'));
    
    if (fs.existsSync(inputPath)) {
      console.log(`Converting ${file} to webp...`);
      await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
      console.log(`Created ${outputPath}`);
    } else {
      console.log(`File not found: ${inputPath}`);
    }
  }
}

convertAll().catch(console.error);
