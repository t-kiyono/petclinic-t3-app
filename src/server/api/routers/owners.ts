import type { Prisma } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const ownersRouter = createTRPCRouter({
  list: publicProcedure
    .input(z.object({
      lastName: z.string(),
    }))
    .query(async ({ input, ctx }) => {
      const mapper = (v: Prisma.ownersGetPayload<{ include: { pets: true }}>) => ({
        id: v.id,
        name: `${v.first_name ?? ""} ${v.last_name ?? ""}`,
        address: v.address,
        city: v.city,
        telephone: v.telephone,
        pets: v.pets 
      });

      if (input.lastName.length > 0) {
        const owners = await ctx.prisma.owners.findMany({
          include: { pets: true },
          where: {
            last_name: {
              contains: input.lastName,
            },
          },
        });
        return owners.map(mapper);
      } else {
        const owners = await ctx.prisma.owners.findMany({ include: { pets: true }});
        return owners.map(mapper);
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
