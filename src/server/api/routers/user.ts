import {adminProcedure, createTRPCRouter} from "../trpc";
import {clerkClient} from '@clerk/nextjs/server';
import {z} from 'zod';
import {createUserSchema} from "~/lib/schemas/CreateUserSchema";
import {inviteUserSchema} from '~/lib/schemas/InviteUserSchema';


export const userRouter = createTRPCRouter({
    getAll: adminProcedure.query(async ({ctx}) => {
        const users = await clerkClient.users.getUserList({
            limit: 500,
        });

        return users.map((user) => {
            const newUser: User = {
                id: user.id,
                email: user.emailAddresses[0]?.emailAddress,
                firstName: user.firstName,
                lastName: user.lastName,
                fullName: `${user.firstName} ${user.lastName}`,
                isAdmin: !!user.publicMetadata?.admin ?? false,
            };

            return newUser;
        });
    }),

    deleteUser: adminProcedure
        .input(
            z.object({
                userId: z.string(),
            })
        )
        .mutation(({ctx, input}) => {
            return clerkClient.users.deleteUser(input.userId);
        }),

    inviteUser: adminProcedure
        .input(inviteUserSchema)
        .mutation(async ({ctx, input}) => {
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

    createUser: adminProcedure
        .input(createUserSchema)
        .mutation(async ({ctx, input}) => {
            const user = await clerkClient.users.createUser({
                firstName: input.firstName,
                lastName: input.lastName,
                emailAddress: [input.emailAddress],
            });

            return user;
        }),

    undoAdmin: adminProcedure
        .input(
            z.object({
                userId: z.string(),
            })
        )
        .mutation(({ctx, input}) => {
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
        .mutation(({ctx, input}) => {
            return clerkClient.users.updateUser(input.userId, {
                publicMetadata: {
                    admin: true,
                },
            });
        }),
});