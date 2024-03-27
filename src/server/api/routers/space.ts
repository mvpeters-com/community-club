import {createTRPCRouter, adminProcedure} from "~/server/api/trpc";
import {spaces} from "~/server/db/schema";
import {createSpaceSchema, updateSpaceSchema} from '~/lib/schemas/spaces';
import {z} from "zod";
import {eq} from 'drizzle-orm';

export const spaceRouter = createTRPCRouter({
    getAll: adminProcedure
        .query(async ({ctx}) => {
            await ctx.db.select().from(spaces);
        }),

    create: adminProcedure
        .input(createSpaceSchema)
        .mutation(async ({ctx, input}) => {
            return ctx.db.insert(spaces).values([
                {
                    name: input.name,
                    type: input.type,
                    updatedAt: new Date(),
                }
            ]);
        }),

    delete: adminProcedure
        .input(z.object({id: z.number()}))
        .mutation(async ({ctx, input}) => {
            return ctx.db.delete(spaces).where(eq(spaces.id, input.id));
        }),

    update: adminProcedure
        .input(updateSpaceSchema)
        .mutation(async ({ctx, input}) => {
            return ctx.db.update(spaces).set({
                ...input,
                updatedAt: new Date(),
            });
        }),
});
