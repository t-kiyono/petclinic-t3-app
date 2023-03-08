import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { ownersRouter } from "~/server/api/routers/owners";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  owners: ownersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
