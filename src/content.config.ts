import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  // One folder per post: src/content/posts/{year}/{slug}/index.mdx.
  // The entry id is "{year}/{slug}", which is also its URL.
  loader: glob({
    pattern: '*/*/index.{md,mdx}',
    base: './src/content/posts',
    generateId: ({ entry }) => entry.replace(/\/index\.mdx?$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      // Hidden, but keeps its place in the issue numbering.
      draft: z.boolean().default(false),
      // Bold subheadline, ≤ ~60 chars, Headline Case.
      deck: z.string().optional(),
      // Longer italic line: article page and front-page lead only.
      subdeck: z.string().optional(),
      section: z.enum(['technology', 'sport', 'life']).optional(),
      cartoon: z
        .object({
          image: image(),
          imageNarrow: image().optional(),
          caption: z.string(),
          alt: z.string(),
        })
        .optional(),
      corrections: z.array(z.object({ date: z.coerce.date(), note: z.string() })).optional(),
    }),
});

export const collections = { posts };
