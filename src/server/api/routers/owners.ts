import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const ownersRouter = createTRPCRouter({
  list: publicProcedure
    .input(z.object({
      lastName: z.string(),
    }))
    .query(async ({ input, ctx }) => {
      if (input.lastName.length > 0) {
        const owners = await ctx.prisma.owners.findMany({
          include: { pets: true },
          where: {
            last_name: {
              contains: input.lastName,
            },
          },
        });
        return owners;
      } else {
        const owners = await ctx.prisma.owners.findMany({ include: { pets: true }});
        return owners;
      }
    }),
  create: publicProcedure
    .input(z.object({
      firstName: z.string(),
      lastName: z.string(),
      address: z.string(),
      city: z.string(),
      telephone: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const owner = await ctx.prisma.owners.create({
        data: {
          first_name: input.firstName,
          last_name: input.lastName,
          address: input.address,
          city: input.city,
          telephone: input.telephone,
        }
      });
      return owner;
    }),
});
