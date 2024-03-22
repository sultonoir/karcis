import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
export const paymentRouter = createTRPCRouter({
  createPayment: protectedProcedure
    .input(
      z.object({
        event: z.string(),
        amount: z.number(),
        totalPrice: z.number(),
        tiket: z.array(
          z.object({
            name: z.string(),
            totalPrice: z.number(),
            totalProduct: z.number(),
            ticketId: z.string(),
            eventId: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user.id;
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to purchase tickets",
        });
      }

      const event = await ctx.xata.db.events
        .filter("id", input.event)
        .getFirst();

      if (event?.author?.id === user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You cant buy this item",
        });
      }

      const exist = await ctx.xata.db.purchase
        .filter({
          $all: [{ events: { $is: event?.id } }, { user: { $is: user } }],
        })
        .getMany();

      if (event?.oneBuy && exist.length > 1) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "event tickets can only be purchased once for each transaction",
        });
      }

      const purchase = await ctx.xata.db.purchase.create({
        events: input.event,
        totalPrice: input.totalPrice,
        amount: input.amount,
        user,
      });

      const ticketMap = input.tiket.map((item) => ({
        ticketId: item.ticketId,
        totalticket: item.totalProduct,
        purchase: purchase.id,
        ticketName: item.name,
      }));
      const updateTicket = input.tiket.map((item) => ({
        ticketId: item.ticketId,
        count: item.totalProduct,
      }));

      await ctx.xata.db.ticketdetail.create(ticketMap);

      await ctx.xata.db.notify.create({
        user: user,
        message: "Payment success",
        event: event?.id ?? "",
        isRead: false,
        purchase: purchase.id,
      });

      await ctx.xata.db.notify.create({
        user: event?.author?.id ?? "",
        message: `${ctx.session.user.name} has purchased ${purchase.amount} tickets`,
        event: event?.id,
        isRead: false,
        type: "host",
        purchase: purchase.id,
      });

      await Promise.all(
        updateTicket.map((item) =>
          ctx.xata.db.tikets.update({
            id: item.ticketId,
            count: { $decrement: item.count },
          }),
        ),
      );
    }),
});
