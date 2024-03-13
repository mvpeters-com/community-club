import {z} from 'zod';

export const createUserSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    emailAddress: z.string()
})

export type CreateUser = z.infer<typeof createUserSchema>;
