import { postRouter } from "@/server/api/routers/post";
import { createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/user";
import { paymentRouter } from "./routers/payment";
import { notifyRoute } from "./routers/notify";
import { revenueRouter } from "./routers/revenue";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  user: userRouter,
  payment: paymentRouter,
  notify: notifyRoute,
  revenue: revenueRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
