import { z } from 'zod';

export const transactionSchema = z.object({
  description: z
    .string()
    .min(3, {
      message: 'Description must be at least 3 characters'
    })
    .max(50, {
      message: 'Description must be at most 50 characters'
    }),
  amount: z.coerce.number().min(0).positive({
    message: 'Amount must be a positive number'
  }),
  type: z.enum(['expense', 'income']),
  category: z.string().min(1, {
    message: 'Category is required'
  }),
  date: z.coerce.date({
    message: 'Date is required'
  })
});

export type TransactionSchema = z.infer<typeof transactionSchema>;
