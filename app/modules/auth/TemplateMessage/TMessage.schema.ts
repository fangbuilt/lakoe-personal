import { z } from 'zod';

export const createTMessageSchema = z.object({
  name: z.string(),
  content: z.string(),
});
