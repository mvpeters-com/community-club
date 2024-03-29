import {createTRPCRouter, protectedProcedure, publicProcedure} from "~/server/api/trpc";
import {events, spaces} from "~/server/db/schema";
import {z} from "zod";
import {eq} from 'drizzle-orm';
import {AccessToken} from 'livekit-server-sdk';
import {currentUser} from '@clerk/nextjs';

export const eventRouter = createTRPCRouter({
    getEventSpace: protectedProcedure
        .input(z.object({slug: z.string()}))
        .query(async ({ctx, input}) => {
            return ctx.db.query
                .spaces
                .findFirst({
                    where: eq(spaces.slug, input.slug),
                    with: {
                        events: true,
                    }
                })
        }),

    getRoomToken: protectedProcedure
        .input(z.object({room: z.string()}))
        .query(async ({ctx, input}) => {
            const apiKey = process.env.LIVEKIT_API_KEY;
            const apiSecret = process.env.LIVEKIT_API_SECRET;
            const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

            if (!apiKey || !apiSecret || !wsUrl) {
                throw new Error('Livekit API key, secret, or URL not set');
            }

            const user = await currentUser();

            if (!user) {
                throw new Error('User not found');
            }

            const at = new AccessToken(
                apiKey,
                apiSecret, {
                    identity: ctx.auth.userId,
                    name: `${user.firstName}`,
                });

            at.addGrant({room: input.room, roomJoin: true, canPublish: true, canSubscribe: true});

            return await at.toJwt();
        }),

    getOne: publicProcedure
        .query(async ({ctx}) => {
            return ctx.db.select().from(events);
        }),
    /*

   create: adminProcedure
       .input(createSpaceSchema)
       .mutation(async ({ctx, input}) => {
           return ctx.db.insert(events).values([
               {
                   name: input.name,
                   slug: slugify(input.name),
                   type: input.type,
                   updatedAt: new Date(),
               }
           ]);
       }),

   delete: adminProcedure
       .input(z.object({id: z.number()}))
       .mutation(async ({ctx, input}) => {
           return ctx.db.delete(events).where(eq(events.id, input.id));
       }),

   update: adminProcedure
       .input(updateSpaceSchema)
       .mutation(async ({ctx, input}) => {
           return ctx.db.update(events).set({
               ...input,
               updatedAt: new Date(),
           });
       }),
       */
});
