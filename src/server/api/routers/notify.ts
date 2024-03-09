import { createTRPCRouter, protectedProcedure } from "../trpc";

export const notifyRoute = createTRPCRouter({
  getAllNotify: protectedProcedure.query(async ({ ctx }) => {
    const notify = await ctx.xata.db.notify
      .select(["*", "event.*", "event.author.*"])
      .filter({ "user.id": ctx.session.user.id })
      .getMany();
    return notify;
  }),
});
