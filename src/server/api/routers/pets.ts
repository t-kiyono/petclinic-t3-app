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
  update: publicProcedure
    .input(z.object({
      id: z.number(),
      name: z.string(),
      birthDate: z.date(),
      typeId: z.number(),
      ownerId: z.number(),
    }))
    .mutation(async ({ input, ctx }) => {
      const pet = await ctx.prisma.pets.update({
        where: {
          id: input.id
        },
        data: {
          name: input.name,
          birth_date: input.birthDate,
          type_id: input.typeId,
          owner_id: input.ownerId,
        }
      });
      return pet;
    }),
  show: publicProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      const pet = ctx.prisma.pets.findUnique({
        where: {
          id: input,
        }
      });
      return pet;
    }),
  showDetail: publicProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      const pet = ctx.prisma.pets.findUnique({
        where: {
          id: input,
        },
        include: {
          owners: true,
          types: true,
          visits: true,
        }
      });
      return pet;
    }),
});
