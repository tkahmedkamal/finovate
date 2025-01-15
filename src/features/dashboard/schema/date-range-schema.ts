import { z } from 'zod';
import { differenceInDays } from 'date-fns';

import { MAX_DATE_RANGE_DAYS } from '@/lib/constants';

export const dateRangeSchema = z
  .object({
    from: z.date(),
    to: z.date()
  })
  .refine(date => differenceInDays(date.to, date.from) <= MAX_DATE_RANGE_DAYS);

export type DateRangeSchemaType = z.infer<typeof dateRangeSchema>;
