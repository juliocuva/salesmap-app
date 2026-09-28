/**
 * assetUrl.js
 * -----------
 * Resuelve la URL pública de un asset (plano, foto, imagen).
 *
 * ESTRATEGIA:
 *  - Si existe VITE_SUPABASE_URL, los archivos pesados se sirven
 *    desde Supabase Storage → la transferencia NO cuenta contra Vercel.
 *  - Si no existe (desarrollo local o fallback), usa la ruta relativa
 *    del servidor local de Vite.
 *
 * VARIABLES DE ENTORNO:
 *   VITE_SUPABASE_URL      → URL base de tu proyecto Supabase (obligatoria)
 *   VITE_STORAGE_BUCKET    → Nombre del bucket (default: 'assets')
 *   VITE_STORAGE_FOLDER    → Sub-carpeta dentro del bucket (default: 'bahiaguacamayas')
 *                            Deja vacío si los archivos están en la raíz del bucket.
 *
 * USO:
 *   import { getAssetUrl } from '@/lib/assetUrl';
 *   const src = getAssetUrl('plano.png');
 *   // → "https://<proyecto>.supabase.co/storage/v1/object/public/assets/bahiaguacamayas/plano.png"
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const BUCKET      = import.meta.env.VITE_STORAGE_BUCKET ?? 'bemap-assets';
const FOLDER      = import.meta.env.VITE_STORAGE_FOLDER ?? '';

/**
 * @param {string} filename  - Nombre del archivo. Ej: 'plano.png' o '/plano.png'
 * @returns {string}         - URL pública completa del asset
 */
export function getAssetUrl(filename) {
  // Normalizar: quitar barra inicial si existe
  const clean = filename.startsWith('/') ? filename.slice(1) : filename;

  if (SUPABASE_URL) {
    const prefix = FOLDER ? `${FOLDER}/` : '';
    return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${prefix}${clean}`;
  }

  // Fallback: Vite dev server (archivos en /public)
  return `/${clean}`;
}

/**
 * Convierte un array de nombres de archivo a URLs externas.
 * @param {string[]} filenames
 * @returns {string[]}
 */
export function getAssetUrls(filenames) {
  return filenames.map(getAssetUrl);
}
