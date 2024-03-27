import {z} from 'zod';

export const createSpaceSchema = z.object({
    name: z.string(),
    type: z.string()
})

export type CreateSpace = z.infer<typeof createSpaceSchema>;

export const updateSpaceSchema = z.object({
    name: z.string().optional(),
    type: z.string().optional()
})

export type UpdateSpace = z.infer<typeof updateSpaceSchema>;