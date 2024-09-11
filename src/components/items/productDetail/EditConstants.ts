import { z } from "zod";

export const EditSchema = z.object({
  content: z.string().min(1)
});