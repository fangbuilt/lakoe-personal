import { z } from 'zod';

export const updateMessageSchema = z.object({
  id: z.string(),
  name: z.string(),
  content: z.string(),
});
