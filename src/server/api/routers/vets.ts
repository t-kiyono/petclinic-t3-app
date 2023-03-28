import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const vetsRouter = createTRPCRouter({
  list: publicProcedure
    .query(async ({ ctx }) => {
      const vets = await ctx.prisma.vets.findMany({
        include: {
          vet_specialties: {
            include: {
              specialties: true,
            },
          },
        },
      });
      return vets;
    })
});
