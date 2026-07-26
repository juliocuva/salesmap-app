export const mockLocals = [
  { id: "local_2a", name: "Local 2A", area: 5, status: "disponible", front: 2, corner: false, terrace: false },
  { id: "local_47a", name: "Local 47A", area: 18.7, status: "disponible", front: 3.2
    , corner: false, terrace: false },
  { id: "local_5", name: "Local 5", area: 50.08, status: "disponible", front: 8, corner: false, terrace: true },
  { id: "local_13", name: "Local 13", area: 40, status: "disponible", front: 6.2, corner: false, terrace: false },
  { id: "local_14a", name: "Local 14A", area: 27.81, status: "disponible", front: 5.4, corner: true, terrace: false },
  { id: "local_7", name: "Local 7", area: 43.32, status: "disponible", front: 7, corner: false, terrace: false },
  { id: "local_47b", name: "Local 47B", area: 17.84, status: "disponible", front: 3.2, corner: false, terrace: false },
  { id: "local_47c", name: "Local 47C", area: 18.83, status: "disponible", front: 3.2, corner: false, terrace: false },
  { id: "local_2", name: "Local 2", area: 52.4, status: "disponible", front: 7, corner: false, terrace: true },
  { id: "local_47d", name: "Local 47D", area: 18.39, status: "disponible", front: 3.2, corner: false, terrace: false }
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
