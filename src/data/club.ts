// Contenido ficticio de demo.
export const stats = [
  { value: 8, label: 'pistas panorámicas' },
  { value: 1200, label: 'alumnos este año' },
  { value: 12, label: 'años en la pista' },
  { value: 30, label: 'marcas en tienda' },
];

export const services = [
  {
    id: 'pistas',
    title: 'Alquiler de pistas',
    text: '8 pistas de cristal, 6 cubiertas y 2 exteriores, con luz LED y césped renovado cada temporada. Reserva en segundos y juega en 90 minutos.',
    href: '/pistas',
    cta: 'Ver pistas',
    image: 'player-man',
  },
  {
    id: 'clases',
    title: 'Clases',
    text: 'De tu primer golpe a tu primer torneo. Grupos reducidos de máximo 4 por pista y entrenadores titulados.',
    href: '/clases',
    cta: 'Ver clases',
    image: 'player-young',
  },
  {
    id: 'tienda',
    title: 'Tienda',
    text: 'Palas, ropa, zapatillas y todo el material. Prueba la pala en pista antes de comprarla.',
    href: '/tienda',
    cta: 'Ir a la tienda',
    image: 'rackets-circle',
  },
  {
    id: 'torneos',
    title: 'Torneos y ligas',
    text: 'Liga interna por niveles, americanas los viernes y un open cada trimestre. Siempre hay alguien con quien jugar.',
    href: '/club',
    cta: 'Ver calendario',
    image: 'handshake',
  },
] as const;

export const racket = {
  name: 'Volea Pro 26',
  price: 189,
  specs: [
    { label: 'Forma', value: 'Diamante' },
    { label: 'Peso', value: '360–375 g' },
    { label: 'Balance', value: 'Alto' },
    { label: 'Núcleo', value: 'EVA soft' },
    { label: 'Cara', value: 'Carbono 18K' },
  ],
};

export const shopCategories = [
  { title: 'Palas', count: 64, image: 'rackets-circle', href: '/tienda?c=palas', size: 'xl' },
  { title: 'Ropa', count: 120, image: 'player-woman', href: '/tienda?c=ropa', size: 'md' },
  { title: 'Pelotas y grips', count: 38, image: 'ball-green', href: '/tienda?c=equipacion', size: 'md' },
  { title: 'Mochilas y paleteros', count: 22, image: null, href: '/tienda?c=equipacion', size: 'wide' },
] as const;

export const brands = ['Kinetic', 'Northline', 'Arcos', 'Vértice', 'Pulso', 'Lumen', 'Ferro', 'Delta'];

export const levels = [
  {
    name: 'Iniciación',
    who: 'Nunca has jugado o acabas de empezar.',
    detail: 'Golpes básicos, posición en pista y reglas. Al terminar ya juegas partidos.',
    schedule: 'L–X 19:00 · S 10:00',
    price: 45,
  },
  {
    name: 'Intermedio',
    who: 'Juegas partidos pero te falta constancia.',
    detail: 'Volea, bandeja y salidas de pared. Táctica de pareja.',
    schedule: 'M–J 19:30 · S 11:30',
    price: 55,
  },
  {
    name: 'Avanzado',
    who: 'Compites en liga y quieres subir de nivel.',
    detail: 'Víbora, remates por 3 y por 4, transiciones y lectura de juego.',
    schedule: 'L–X 21:00',
    price: 65,
  },
  {
    name: 'Competición',
    who: 'Juegas torneos federados.',
    detail: 'Plan semanal con preparación física, vídeo-análisis y seguimiento en torneo.',
    schedule: 'L–V 08:00',
    price: 120,
  },
  {
    name: 'Escuela infantil',
    who: 'De 6 a 16 años.',
    detail: 'Aprender jugando, con grupos por edad y material incluido.',
    schedule: 'L–J 17:30',
    price: 40,
  },
];

export const coaches = [
  { name: 'Lucía Ferrán', role: 'Directora deportiva', image: 'player-young' },
  { name: 'Diego Marín', role: 'Entrenador de competición', image: 'player-man2' },
  { name: 'Álex Ortega', role: 'Escuela infantil', image: 'player-man' },
];

export const courtPrices = [
  { slot: 'Valle', hours: 'L–V 07:00–17:00', price: 24 },
  { slot: 'Punta', hours: 'L–V 17:00–23:30', price: 32 },
  { slot: 'Fin de semana', hours: 'S–D 08:00–22:00', price: 30 },
];

export const testimonials = [
  { quote: 'Empecé sin saber coger la pala y en tres meses ya jugaba la liga. Las clases son lo mejor del club.', name: 'Marta G.', meta: 'Alumna de iniciación' },
  { quote: 'Las pistas están siempre impecables y reservar es cosa de diez segundos.', name: 'Jorge P.', meta: 'Socio desde 2019' },
  { quote: 'Probé tres palas en pista antes de elegir. En ninguna otra tienda me lo habían ofrecido.', name: 'Nerea L.', meta: 'Clienta de la tienda' },
  { quote: 'Las americanas de los viernes son el mejor plan de la semana.', name: 'Carlos R.', meta: 'Nivel intermedio' },
  { quote: 'Mis hijos van a la escuela y salen encantados. Grupos pequeños y entrenadores muy atentos.', name: 'Ana M.', meta: 'Madre de dos alumnos' },
];

export const classSteps = [
  { title: 'Prueba de nivel gratis', text: '30 minutos en pista con un entrenador para ver cómo juegas.' },
  { title: 'Te asignamos grupo', text: 'Te colocamos con jugadores de tu nivel y en el horario que te venga bien.' },
  { title: 'A jugar', text: 'Clases semanales de 60 minutos. Si faltas, recuperas la clase en otro grupo.' },
];

export const classFaqs = [
  { q: '¿Necesito traer pala?', a: 'No. Te dejamos una pala de prueba gratis durante el primer mes.' },
  { q: '¿Qué pasa si falto a una clase?', a: 'Puedes recuperarla en otro grupo de tu nivel esa misma semana o la siguiente.' },
  { q: '¿Hay clases particulares?', a: 'Sí, desde 35 € la hora. Pregúntanos por WhatsApp y te buscamos hueco.' },
  { q: '¿Cómo se paga?', a: 'Mensualidad por domiciliación o en recepción. Sin matrícula.' },
];

export const courtFeatures = [
  { value: '6', label: 'Pistas cubiertas', text: 'Juega llueva o haga calor. Cubiertas, con laterales abiertos y ventilación.' },
  { value: '2', label: 'Pistas exteriores', text: 'Para las tardes de primavera y verano, con iluminación nocturna.' },
  { value: '100%', label: 'Cristal panorámico', text: 'Todas las pistas con cristal templado de 12 mm y estructura panorámica.' },
  { value: 'LED', label: 'Luz sin sombras', text: 'Iluminación LED de 500 lux en todas las pistas, sin coste extra.' },
];

export const rentals = [
  { item: 'Pala de alquiler', price: 3 },
  { item: 'Pala de prueba (gama alta)', price: 0, note: 'Gratis con compromiso de compra' },
  { item: 'Bote de pelotas', price: 6.5 },
  { item: 'Toalla', price: 1.5 },
];

export const facilities = [
  { title: 'Vestuarios', text: 'Con duchas, taquillas con candado y secadores.' },
  { title: 'Cafetería', text: 'Terraza con vista a las pistas centrales. Desayunos desde las 7:00.' },
  { title: 'Parking gratuito', text: '60 plazas y aparcamiento de bicis cubierto.' },
  { title: 'Fisioterapia', text: 'Fisio deportivo dos tardes por semana con cita previa.' },
  { title: 'Tienda', text: 'Material, encordado de grips y prueba de palas.' },
  { title: 'Zona infantil', text: 'Espacio vigilado para peques mientras juegas.' },
];

export const events = [
  { date: '2026-10-23', title: 'Americana de otoño', level: 'Todos los niveles', price: 'Gratis para socios' },
  { date: '2026-11-07', title: 'Liga interna · Jornada 5', level: 'Por categorías', price: 'Incluido en la liga' },
  { date: '2026-11-20', title: 'Mixto nocturno', level: 'Intermedio', price: '15 € por pareja' },
  { date: '2026-12-12', title: 'Open Volea de Navidad', level: 'Abierto', price: '30 € por pareja' },
];
