import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const visitsRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({
      petId: z.number(),
      visitDate: z.date(),
      description: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const visit = ctx.prisma.visits.create({
        data: {
          pet_id: input.petId,
          visit_date: input.visitDate,
          description: input.description,
        }
      });
      return visit;
    }),
  listByPetId: publicProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      const visits = await ctx.prisma.visits.findMany({
        where: {
          pet_id: input,
        }
      });
      return visits;
    })
});
