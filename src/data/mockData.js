export const mockLocals = [
  // Locales disponibles (según imagen proporcionada)
  { id: "local_14b", name: "Local 14B", area: 19.53, price: 410130000, status: "disponible", delivery: "2026" },
  { id: "local_9c", name: "Local 9C", area: 26.10, price: 548100000, status: "disponible", delivery: "2026" },
  { id: "local_9b", name: "Local 9B", area: 26.30, price: 552300000, status: "disponible", delivery: "2026" },
  { id: "local_46", name: "Local 46", area: 122.92, price: 2581320000, status: "disponible", delivery: "2026" },
  
  { id: "local_43", name: "Local 43", area: 65.10, price: 1367100000, status: "disponible", delivery: "2027-1" },
  { id: "local_41", name: "Local 41", area: 65.14, price: 1367940000, status: "disponible", delivery: "2027-1" },
  { id: "local_25b", name: "Local 25B", area: 34.01, price: 714210000, status: "disponible", delivery: "2027-1" },
  { id: "local_25a", name: "Local 25A", area: 29.90, price: 627900000, status: "disponible", delivery: "2027-1" },
  { id: "local_24a", name: "Local 24A", area: 22.86, price: 480060000, status: "disponible", delivery: "2027-1" },
  { id: "local_24b", name: "Local 24B", area: 25.88, price: 543480000, status: "disponible", delivery: "2027-1" },
  
  { id: "local_31a", name: "Local 31A", area: 17.31, price: 363510000, status: "disponible", delivery: "2027-2" },
  { id: "local_31b", name: "Local 31B", area: 35.89, price: 753690000, status: "disponible", delivery: "2027-2" },
  { id: "local_31", name: "Local 31", area: 195.80, price: 4111800000, status: "disponible", delivery: "2027-2" },
  { id: "local_30", name: "Local 30", area: 24.56, price: 515760000, status: "disponible", delivery: "2027-2" },
  { id: "local_30c", name: "Local 30C", area: 24.87, price: 522270000, status: "disponible", delivery: "2027-2" },
  { id: "local_30b", name: "Local 30B", area: 24.87, price: 522270000, status: "disponible", delivery: "2027-2" },
  { id: "local_30a", name: "Local 30A", area: 24.87, price: 522270000, status: "disponible", delivery: "2027-2" },
  { id: "local_29a", name: "Local 29A", area: 83.42, price: 1751820000, status: "disponible", delivery: "2027-2" },
  
  { id: "local_sotano_1", name: "Local A (Sótano 1)", area: 600, price: null, status: "disponible", delivery: "sotano", floor: "sotano_1" },
  { id: "local_sotano_2", name: "Local B (Sótano 2)", area: 889.12, price: null, status: "disponible", delivery: "sotano", floor: "sotano_2" },
  { id: "local_sotano_3", name: "Local D (Sótano 3)", area: 490.39, price: null, status: "disponible", delivery: "sotano", floor: "sotano_3" },

  // Locales para alquilar
  { id: "local_9a", name: "Local 9A", area: 0, price: null, status: "alquiler" },
  { id: "local_10", name: "Local 10", area: 0, price: null, status: "alquiler" },
  { id: "local_11", name: "Local 11", area: 0, price: null, status: "alquiler" },
  { id: "local_47c", name: "Local 47C", area: 18.83, status: "alquiler", front: 3.2, corner: false, terrace: false },
  { id: "local_2", name: "Local 2", area: 52.4, status: "alquiler", front: 7, corner: false, terrace: true },

  // Locales iniciales (ahora en entrega 2026)
  { id: "local_2a", name: "Local 2A", area: 5, price: 105000000, status: "disponible", delivery: "2026", front: 2, corner: false, terrace: false },
  { id: "local_47a", name: "Local 47A", area: 18.7, price: 392700000, status: "disponible", delivery: "2026", front: 3.2, corner: false, terrace: false },
  { id: "local_5", name: "Local 5", area: 50.08, price: 1051680000, status: "disponible", delivery: "2026", front: 8, corner: false, terrace: true },
  { id: "local_13", name: "Local 13", area: 40, price: 840000000, status: "disponible", delivery: "2026", front: 6.2, corner: false, terrace: false },
  { id: "local_14a", name: "Local 14A", area: 27.81, price: 584010000, status: "disponible", delivery: "2026", front: 5.4, corner: true, terrace: false },
  { id: "local_7", name: "Local 7", area: 43.32, price: 909720000, status: "disponible", delivery: "2026", front: 7, corner: false, terrace: false },
  { id: "local_47b", name: "Local 47B", area: 17.84, price: 374640000, status: "disponible", delivery: "2026", front: 3.2, corner: false, terrace: false },
  { id: "local_47d", name: "Local 47D", area: 18.39, price: 386190000, status: "disponible", delivery: "2026", front: 3.2, corner: false, terrace: false }
];

export const environmentData = [
  { label: "Aeropuerto Matecaña", value: "15 minutos", icon: "Plane" },
  { label: "Bioparque Ukumarí", value: "8 minutos", icon: "TreePine" },
  { label: "Hospital de Alta Complejidad", value: "8 minutos", icon: "Hospital" },
  { label: "Nuevos proyectos de vivienda", value: "12", icon: "Building" }
];

export const nearbyCommerce = [
  { id: 1, name: "Juan Valdez", category: "Cafetería", type: "Cadena", distance: 780 },
  { id: 2, name: "Tostao", category: "Cafetería", type: "Cadena", distance: 850 },
  { id: 3, name: "El Barista", category: "Cafetería", type: "Independiente", distance: 1200 },
  { id: 4, name: "Popsy", category: "Heladería", type: "Cadena", distance: 600 },
  { id: 5, name: "Mimo's", category: "Heladería", type: "Cadena", distance: 900 },
  { id: 6, name: "Gelato Artesanal", category: "Heladería", type: "Premium", distance: 2100 },
  { id: 7, name: "Mascotas Premium", category: "Petshop", type: "Especializada", distance: 3500 },
  { id: 8, name: "Drogas La Rebaja", category: "Droguería", type: "Cadena", distance: 400 },
  { id: 9, name: "Farmatodo", category: "Droguería", type: "Premium", distance: 1500 },
];

export const categories = [
  { id: "cafeteria", label: "Cafeterías", icon: "Coffee" },
  { id: "heladeria", label: "Heladerías", icon: "IceCream" },
  { id: "petshop", label: "Petshops", icon: "Dog" },
  { id: "drogueria", label: "Droguerías", icon: "Pill" },
  { id: "restaurante", label: "Restaurantes", icon: "Utensils" },
  { id: "joyeria", label: "Joyerías", icon: "Gem" },
];

export const compatibilityRules = {
  "cafeteria": {
    score: 89,
    reasons: [
      "Cercanía a hoteles.",
      "Alto crecimiento residencial.",
      "Baja oferta de café de especialidad.",
      "Flujo esperado de turistas.",
      "Cercanía al aeropuerto."
    ]
  },
  "joyeria": {
    score: 95,
    reasons: [
      "No existe joyería especializada en 2km.",
      "Público objetivo de alto poder adquisitivo proyectado.",
      "Seguridad del centro comercial atrae este tipo de compras."
    ]
  },
  "petshop": {
    score: 75,
    reasons: [
      "Alta densidad de mascotas en nuevos proyectos residenciales.",
      "Solo 1 competidor a más de 3km.",
      "Demanda de servicios premium insatisfecha."
    ]
  },
  "heladeria": {
    score: 82,
    reasons: [
      "Alta demanda de postres por el clima cálido.",
      "Atractivo fuerte para familias y niños los fines de semana.",
      "Excelente complemento para la oferta gastronómica del sector."
    ]
  },
  "drogueria": {
    score: 91,
    reasons: [
      "Servicio esencial con alta rotación en zonas de crecimiento.",
      "Cercanía a vías principales, ideal para domicilios.",
      "Poca competencia en formato 24 horas en el sector."
    ]
  },
  "restaurante": {
    score: 85,
    reasons: [
      "Alto flujo de trabajadores y turistas durante el día.",
      "Falta de opciones gastronómicas variadas en el sector.",
      "Gran potencial para captar clientes de nuevos proyectos de vivienda."
    ]
  }
};
