import type { ImageMetadata } from 'astro';

// Fotos de Unsplash (licencia gratuita) en src/assets/photos, por nombre de archivo.
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.jpg', { eager: true });

export const photos = Object.fromEntries(
  Object.entries(files).map(([path, mod]) => [path.split('/').pop()!.replace('.jpg', ''), mod.default]),
) as Record<string, ImageMetadata>;
