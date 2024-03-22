import { createTRPCRouter, protectedProcedure } from "../trpc";

export const revenueRouter = createTRPCRouter({
  getRevenue: protectedProcedure.query(async ({ ctx }) => {
    const purchase = await ctx.xata.db.purchase
      .select(["*", "user.*", "events.*"])
      .filter({
        $all: [
          { "events.author.id": ctx.session.user.id },
          { "events.startDate": { $ge: new Date() } },
        ],
      })
      .sort("xata.createdAt", "desc")
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

    const cart: { name: string; ticket: number }[] = [];
    const namaHari: string[] = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    namaHari.forEach((hari) => {
      cart.push({ name: hari, ticket: 0 });
    });
    purchase.forEach((item) => {
      const dateNow: number = item.xata.createdAt.getDay();
      const dateString = namaHari[dateNow];

      const existingItem = cart.find(
        (cartItem) => cartItem.name === dateString,
      );

      if (existingItem) {
        existingItem.ticket += item.amount;
      } else {
        cart.push({
          name: dateString!,
          ticket: item.amount,
        });
      }
    });

    const recent = purchase.map((item) => ({
      id: item.id,
      eventTitle: item.events?.title,
      userName: item.user?.name,
      userImage: item.user?.image,
      ticketTotal: item.amount,
      createdAt: item.xata.createdAt,
    }));
    return {
      totalPrice,
      totalTicket,
      totalEvent,
      recent,
      cart,
    };
  }),
});
