import {adminProcedure, createTRPCRouter} from "../trpc";
import {clerkClient} from '@clerk/nextjs/server';
import {z} from 'zod';
import {createUserSchema, inviteUserSchema} from "~/lib/schemas/users";

export const userRouter = createTRPCRouter({
    getAll: adminProcedure.query(async () => {
        const users = await clerkClient.users.getUserList({
            limit: 500,
        });

        return users.map((user) => {
            return {
                id: user.id,
                email: user.emailAddresses[0]?.emailAddress,
                firstName: user.firstName,
                lastName: user.lastName,
                fullName: `${user.firstName} ${user.lastName}`,
                isAdmin: !!user.publicMetadata?.admin ?? false,
            };
        });
    }),

    delete: adminProcedure
        .input(z.object({id: z.string()}))
        .mutation(({input}) => {
            return clerkClient.users.deleteUser(input.id);
        }),

    invite: adminProcedure
        .input(inviteUserSchema)
        .mutation(async ({input}) => {
            try {
                await clerkClient.allowlistIdentifiers.createAllowlistIdentifier({
                    identifier: input.email,
                    notify: false,
                });

                return clerkClient.invitations.createInvitation({
                    emailAddress: input.email,
                });
            } catch (e: unknown) {
                throw new Error(JSON.stringify(e));
            }
        }),

    create: adminProcedure
        .input(createUserSchema)
        .mutation(async ({input}) => {
            return await clerkClient.users.createUser({
                firstName: input.firstName,
                lastName: input.lastName,
                emailAddress: [input.emailAddress],
            });
        }),

    undoAdmin: adminProcedure
        .input(
            z.object({
                userId: z.string(),
            })
        )
        .mutation(({input}) => {
            return clerkClient.users.updateUser(input.userId, {
                publicMetadata: {
                    admin: false,
                },
            });
        }),

    makeAdmin: adminProcedure
        .input(
            z.object({
                userId: z.string(),
            })
        )
        .mutation(({input}) => {
            return clerkClient.users.updateUser(input.userId, {
                publicMetadata: {
                    admin: true,
                },
            });
        }),
});