// Datos ficticios de demo: sustituir por los reales del club.
export const club = {
  name: 'Volea',
  fullName: 'Volea Padel Club',
  tagline: 'Juega. Entrena. Equípate.',
  address: 'Av. del Cristal 12, 28042 Madrid',
  mapsUrl: 'https://maps.google.com/?q=Madrid',
  phone: '+34 600 000 000',
  whatsapp: '34600000000',
  email: 'hola@volea.example',
  bookingUrl: 'https://playtomic.com',
  instagram: 'https://instagram.com',
  hours: [
    { days: 'Lunes – Viernes', time: '07:00 – 23:30' },
    { days: 'Sábado y domingo', time: '08:00 – 22:00' },
  ],
};

export const nav = [
  { href: '/pistas', label: 'Pistas' },
  { href: '/clases', label: 'Clases' },
  { href: '/tienda', label: 'Tienda' },
  { href: '/club', label: 'El club' },
  { href: '/contacto', label: 'Contacto' },
];

export const whatsappLink = (text: string) =>
  `https://wa.me/${club.whatsapp}?text=${encodeURIComponent(text)}`;
