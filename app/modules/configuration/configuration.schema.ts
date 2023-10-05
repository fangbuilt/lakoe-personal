import { object, string } from 'zod';

export const create = object({
  title: string().min(1),
});
