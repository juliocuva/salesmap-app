/**
 * upload-assets-to-supabase.mjs
 * ─────────────────────────────
 * Sube todos los archivos pesados de /public al bucket "assets"
 * de Supabase Storage bajo la carpeta "bahiaguacamayas/".
 *
 * PREREQUISITO:
 *   1. Crear el bucket "assets" en Supabase → Storage → New bucket
 *      Marcar "Public bucket" = ON
 *   2. Tener un .env con:
 *        VITE_SUPABASE_URL=https://<proyecto>.supabase.co
 *        VITE_SUPABASE_ANON_KEY=<anon-public-key>
 *
 * USO:
 *   node scripts/upload-assets-to-supabase.mjs
 *
 * Solo sube los archivos que NO existen aún en el bucket (upsert: false).
 * Para forzar re-subida: cambia upsert a true.
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const BUCKET = 'assets';
const FOLDER = 'bahiaguacamayas';

// Extensiones a subir (excluimos .svg pequeños que ya están bien en Vercel)
const UPLOAD_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.pdf'];

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function uploadAll() {
  const files = fs.readdirSync(PUBLIC_DIR).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return UPLOAD_EXTENSIONS.includes(ext);
  });

  console.log(`\n📦 Archivos a subir: ${files.length}`);
  const totalBytes = files.reduce((sum, f) => {
    return sum + fs.statSync(path.join(PUBLIC_DIR, f)).size;
  }, 0);
  console.log(`📏 Peso total: ${(totalBytes / 1024 / 1024).toFixed(2)} MB\n`);

  let ok = 0;
  let skipped = 0;
  let errors = 0;

  for (const filename of files) {
    const filePath = path.join(PUBLIC_DIR, filename);
    const storagePath = `${FOLDER}/${filename}`;
    const ext = path.extname(filename).toLowerCase().slice(1);

    const mimeTypes = {
      png: 'image/png',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      webp: 'image/webp',
      pdf: 'application/pdf',
    };
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    const fileBuffer = fs.readFileSync(filePath);
    const sizeMB = (fileBuffer.length / 1024 / 1024).toFixed(2);

    process.stdout.write(`  ↑ ${filename} (${sizeMB} MB) ... `);

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, fileBuffer, {
        contentType,
        upsert: false, // No sobreescribe si ya existe
      });

    if (error) {
      if (error.message?.includes('already exists') || error.statusCode === '409') {
        console.log('⏭  ya existe, omitido');
        skipped++;
      } else {
        console.log(`❌ ERROR: ${error.message}`);
        errors++;
      }
    } else {
      console.log('✅ OK');
      ok++;
    }
  }

  console.log('\n─────────────────────────────────────');
  console.log(`✅ Subidos  : ${ok}`);
  console.log(`⏭  Omitidos : ${skipped}`);
  console.log(`❌ Errores  : ${errors}`);
  console.log(`\n🔗 URL base pública:`);
  console.log(`   ${process.env.VITE_SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${FOLDER}/\n`);
}

uploadAll().catch(console.error);
