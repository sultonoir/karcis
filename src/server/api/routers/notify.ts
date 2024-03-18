import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const notifyRoute = createTRPCRouter({
  getAllNotify: protectedProcedure.query(async ({ ctx }) => {
    const notify = await ctx.xata.db.notify
      .select(["*", "event.*", "event.author.*"])
      .filter({ "user.id": ctx.session.user.id })
      .sort("xata.createdAt", "desc")
      .getMany();
    return notify;
  }),
  getNotifyLength: protectedProcedure.query(async ({ ctx }) => {
    const notify = await ctx.xata.db.notify
      .select(["*", "event.*", "event.author.*"])
      .filter({ "user.id": ctx.session.user.id, isOpen: false })
      .sort("xata.createdAt", "desc")
      .getMany();
    return notify.length;
  }),
  openNotify: protectedProcedure.mutation(async ({ ctx }) => {
    const notify = await ctx.xata.db.notify
      .select(["*", "event.*", "event.author.*"])
      .filter({ "user.id": ctx.session.user.id })
      .sort("xata.createdAt", "desc")
      .getMany();
    await Promise.all(
      notify.map((item) =>
        ctx.xata.db.notify.update(item.id, {
          isOpen: true,
        }),
      ),
    );
  }),
  readsNotify: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.xata.db.notify.update(input.id, {
        isRead: true,
      });
    }),
});
