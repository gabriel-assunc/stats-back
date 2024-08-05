import { z } from 'zod'

export const CategorySchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().max(255).min(3),
    icon: z.string().optional(),
    url: z.string(),
    test: z.string().optional()
});

export type CategoryType = z.infer<typeof CategorySchema>;