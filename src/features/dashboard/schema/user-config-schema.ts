import { z } from 'zod';

import { currencies } from '@/lib/constants';

export const userConfigSchema = z.object({
  currency: z
    .string()
    .refine(value => currencies.find(currency => currency.currency === value), {
      message: 'Invalid currency, please select a valid currency'
    })
});

export type UserConfigSchema = z.infer<typeof userConfigSchema>;
