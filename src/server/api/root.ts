import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { restaurantRouter } from "./routers/restaurant";
import { staffRouter } from "./routers/staff";

export const appRouter = createTRPCRouter({
  restaurants: restaurantRouter,
  staff: staffRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
