import { z } from 'zod';

export const periodSchema = z.object({
  viewMode: z.custom(value => {
    if (value !== 'month' && value !== 'year') {
      throw new Error('Invalid view mode');
    }
    return value;
  }),
  month: z.coerce.number({
    message: 'Invalid month'
  }),
  year: z.coerce.number({
    message: 'Invalid year'
  })
});

export type Period = z.infer<typeof periodSchema>;
