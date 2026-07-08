import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({ base: "./src/content/posts", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()),
    category: z.string(),
    featured: z.boolean().default(false),
    signal: z.number().min(0).max(100),
    accent: z.enum(["cyan", "gold", "red", "lime"]).default("cyan")
  })
});

export const collections = { posts };
