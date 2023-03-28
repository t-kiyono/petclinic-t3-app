import { createTRPCRouter } from "~/server/api/trpc";
import { ownersRouter, petsRouter, typesRouter, vetsRouter } from "~/server/api/routers";
import { visitsRouter } from "./routers/visits";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  owners: ownersRouter,
  pets: petsRouter,
  types: typesRouter,
  visits: visitsRouter,
  vets: vetsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
