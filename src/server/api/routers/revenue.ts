import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const revenueRouter = createTRPCRouter({
  getRevenue: protectedProcedure.query(async ({ ctx }) => {
    const sekarang = new Date();
    const awalMingguIni = new Date(
      sekarang.getFullYear(),
      sekarang.getMonth(),
      sekarang.getDate() - sekarang.getDay(),
    );

    const akhirMingguIni = new Date(
      sekarang.getFullYear(),
      sekarang.getMonth(),
      sekarang.getDate() - sekarang.getDay() + 7,
    );
    const purchase = await ctx.xata.db.purchase
      .select(["*", "user.*", "events.*"])
      .filter({
        $all: [
          { "events.author.id": ctx.session.user.id },
          { "events.startDate": { $ge: new Date() } },
          { "xata.createdAt": { $ge: awalMingguIni } },
          { "xata.createdAt": { $le: akhirMingguIni } },
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

    const recent = purchase
      .map((item) => ({
        id: item.id,
        eventTitle: item.events?.title,
        userName: item.user?.name,
        userImage: item.user?.image,
        ticketTotal: item.amount,
        createdAt: item.xata.createdAt,
      }))
      .slice(0, 5);
    return {
      totalPrice,
      totalTicket,
      totalEvent,
      recent,
      cart,
    };
  }),
  getOrder: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const purchase = await ctx.xata.db.purchase
        .select(["*", "user.*", "events.*"])
        .filter({
          $all: [{ "events.id": input.id }],
        })
        .sort("xata.createdAt", "desc")
        .getMany();

      const totalPrice = purchase.reduce((acc, cur) => acc + cur.totalPrice, 0);

      const ticketPurchase = purchase.reduce((acc, cur) => acc + cur.amount, 0);
      const result = purchase.map((item) => ({
        id: item.id,
        userName: item.user?.name,
        eventName: item.events?.title,
        email: item.user?.email,
        ticket: item.amount,
        amount: item.totalPrice,
      }));

      return {
        result,
        totalPrice,
        ticketPurchase,
      };
    }),
});
