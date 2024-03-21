import { createTRPCRouter, protectedProcedure } from "../trpc";

export const revenueRouter = createTRPCRouter({
  getRevenue: protectedProcedure.query(async ({ ctx }) => {
    const purchase = await ctx.xata.db.purchase
      .select(["*"])
      .filter({
        $all: [
          { "events.author.id": ctx.session.user.id },
          { "events.startDate": { $ge: new Date() } },
        ],
      })
      .getMany();

    const events = await ctx.xata.db.events
      .filter({
        $all: [
          { "author.id": ctx.session.user.id },
          { startDate: { $ge: new Date() } },
        ],
      })
      .getMany();

    const totalEvent = events.length;
    const totalPrice = purchase.reduce((acc, cur) => acc + cur.totalPrice, 0);

    const totalTicket = purchase.reduce((acc, cur) => acc + cur.amount, 0);
    return {
      totalPrice,
      totalTicket,
      totalEvent,
      events,
    };
  }),
});
