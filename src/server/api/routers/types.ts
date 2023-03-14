import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const typesRouter = createTRPCRouter({
  list: publicProcedure
    .query(async ({ ctx }) => {
      const types = await ctx.prisma.types.findMany();
      return types;
    }),
});
