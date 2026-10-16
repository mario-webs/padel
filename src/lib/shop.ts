import { getCollection } from 'astro:content';

export const categories = [
  { id: 'palas', label: 'Palas' },
  { id: 'ropa', label: 'Ropa' },
  { id: 'equipacion', label: 'Equipación' },
] as const;

export const formatPrice = (n: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: n % 1 ? 2 : 0 }).format(n);

export const getProducts = async () =>
  (await getCollection('products')).sort((a, b) => a.data.order - b.data.order);
