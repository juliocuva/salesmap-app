/**
 * assetUrl.js
 * -----------
 * Resuelve la URL pública de un asset (plano, foto, imagen).
 *
 * VARIABLES DE ENTORNO:
 *   VITE_STORAGE_URL    → URL base de Supabase Storage (Config, pública). Prioritaria.
 *   VITE_SUPABASE_URL   → Fallback si VITE_STORAGE_URL no está definida.
 *   VITE_STORAGE_BUCKET → Nombre del bucket (default: 'bemap-assets')
 *   VITE_STORAGE_FOLDER → Sub-carpeta dentro del bucket (default: vacío = raíz)
 */

const STORAGE_URL = import.meta.env.VITE_STORAGE_URL ?? import.meta.env.VITE_SUPABASE_URL;
const BUCKET      = import.meta.env.VITE_STORAGE_BUCKET ?? 'bemap-assets';
const FOLDER      = import.meta.env.VITE_STORAGE_FOLDER ?? '';

/**
 * @param {string} filename  - Nombre del archivo. Ej: 'plano.jpg'
 * @returns {string}         - URL pública completa del asset
 */
export function getAssetUrl(filename) {
  const clean = filename.startsWith('/') ? filename.slice(1) : filename;

  if (STORAGE_URL) {
    const prefix = FOLDER ? `${FOLDER}/` : '';
    return `${STORAGE_URL}/storage/v1/object/public/${BUCKET}/${prefix}${clean}`;
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
