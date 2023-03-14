import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const petsRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({
      name: z.string(),
      birthDate: z.date(),
      typeId: z.number(),
      ownerId: z.number(),
    }))
    .mutation(async ({ input, ctx }) => {
      const pet = await ctx.prisma.pets.create({
        data: {
          name: input.name,
          birth_date: input.birthDate,
          type_id: input.typeId,
          owner_id: input.ownerId,
        }
      });
      return pet;
    }),
});
