import z from 'zod';

export const categorySchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Name must be at least 3 characters'
    })
    .max(20, {
      message: 'Name must be at most 20 characters'
    }),
  description: z
    .string()
    .max(50, {
      message: 'Description must be at most 50 characters'
    })
    .optional(),
  type: z.enum(['income', 'expense']),
  icon: z
    .string()
    .min(1, {
      message: 'Icon field is required'
    })
    .max(20)
});

export type CategorySchema = z.infer<typeof categorySchema>;
