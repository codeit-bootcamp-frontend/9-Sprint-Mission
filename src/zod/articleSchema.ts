import { z } from "zod";

export const articleSchema = z.object({
  title: z.string(),
  content: z.string(),
  image: z.string().optional(),
});

export type ArticleSchema = z.infer<typeof articleSchema>;
