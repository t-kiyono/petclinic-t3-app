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
          orderBy: {
            id: "asc",
          },
        });
        return owners;
      } else {
        const owners = await ctx.prisma.owners.findMany({
          include: { pets: true },
          orderBy: {
            id: "asc",
          },
        });
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
  show: publicProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      const owner = await ctx.prisma.owners.findUnique({
        where: {
          id: input,
        },
      });
      return owner;
    }),
  showDetail: publicProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      const owner = await ctx.prisma.owners.findUnique({
        where: {
          id: input,
        },
        include: {
          pets: {
            include: {
              types: true,
              visits: true,
            },
            orderBy: {
              id: "asc",
            }
          },
        },
      });
      return owner;
    }),
  update: publicProcedure
    .input(z.object({
      id: z.number(),
      firstName: z.string(),
      lastName: z.string(),
      address: z.string(),
      city: z.string(),
      telephone: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const owner = await ctx.prisma.owners.update({
        where: {
          id: input.id
        },
        data: {
          first_name: input.firstName,
          last_name: input.lastName,
          address: input.address,
          city: input.city,
          telephone: input.telephone,
        }
      });
      return owner;
    })
});
