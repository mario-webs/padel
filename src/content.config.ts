import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    brand: z.string(),
    category: z.enum(['palas', 'ropa', 'equipacion']),
    // Ilustración que dibuja ProductArt.
    art: z.enum(['racket', 'balls', 'grip', 'bag', 'shirt']),
    colors: z.object({ main: z.string(), accent: z.string() }),
    price: z.number().positive(),
    oldPrice: z.number().positive().optional(),
    badge: z.string().optional(),
    sizes: z.array(z.string()).optional(),
    specs: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    order: z.number().default(99),
  }),
});

export const collections = { products };
