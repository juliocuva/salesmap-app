import { getAssetUrl, getAssetUrls } from '../../lib/assetUrl';

// getAssetUrl resuelve automáticamente la URL desde Supabase Storage (bemap-assets)
// o desde /public en desarrollo local, según VITE_SUPABASE_URL.
const a  = (path) => getAssetUrl(path);
const aa = (paths) => getAssetUrls(paths);

export const config = {
  id: 'bahiaguacamayas',
  name: 'Bahía Guacamayas',
  client: 'Constructora Default',
  sheetUrl: 'https://docs.google.com/spreadsheets/d/1iQEP5NKzqN_rZZ83CzPX0b3ez2o8J6bIoPB4ZyDu1aU/export?format=csv',
  floors: [
    { id: 'piso_1',   label: 'Primer Piso', bgImage: a('plano.jpg') },
    { id: 'sotano_1', label: 'Sótano 1',   bgImage: a('14 de agosto_Planta Sotano 01  N -3.65 mts.webp') },
    { id: 'sotano_2', label: 'Sótano 2',   bgImage: a('14 de agosto_Planta Sotano 02  N -7.65 mts.webp') },
    { id: 'sotano_3', label: 'Sótano 3',   bgImage: a('14 de agosto_Planta Sotano 03  N -11.30 mts.webp') },
  ],
  visionModes: {
    cafeteria:   aa(['cafeteria1.png', 'cafeteria2.png']),
    heladeria:   aa(['heladeria1.png', 'heladeria2.png']),
    joyeria:     aa(['joyeria1.png', 'joyeria2.png']),
    accesorios:  aa(['accesorios1.png']),
    restaurante: aa(['restaurante1.png', 'restaurante2.png', 'restaurante3.png', 'restaurante4.png', 'restaurante5.png']),
    drogueria:   aa(['drogueria1.png', 'drogueria2.png']),
    petshop:     aa(['petshop1.png', 'petshop2.png']),
    camera1:     aa(['Img_7523_.png']),
    camera2:     aa(['Img_7520.png']),
    camera3:     aa(['img46_bobadilla.jpg']),
    camera4:     aa(['Img 7525 Pasillos local 14b.png']),
    camera5:     aa(['Img 7524 Pasillos local 14b.png']),
  },
  defaultImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop',
};
