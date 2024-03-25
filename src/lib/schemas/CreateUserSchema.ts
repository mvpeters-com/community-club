import {z} from 'zod';

export const createUserSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    emailAddress: z.string().email()
})

export type CreateUser = z.infer<typeof createUserSchema>;
