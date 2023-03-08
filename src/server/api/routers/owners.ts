import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const ownersRouter = createTRPCRouter({
  list: publicProcedure
    .input(z.object({
      lastName: z.string(),
    }))
    .query(({ input, ctx }) => {
      if (input.lastName.length > 0) {
        return ctx.prisma.owners.findMany({ where: {
          last_name: {
            contains: input.lastName
          }
        }});
      } else {
        return ctx.prisma.owners.findMany();
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
      await ctx.prisma.owners.create({
        data: input
      });
    }),
});
