import {z} from 'zod';

export const inviteUserSchema = z.object({
    email: z.string(),
})

export type InviteUser = z.infer<typeof inviteUserSchema>;

export const createUserSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    emailAddress: z.string().email()
})

export type CreateUser = z.infer<typeof createUserSchema>;
