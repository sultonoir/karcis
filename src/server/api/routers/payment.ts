import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
export const paymentRouter = createTRPCRouter({
  createPayment: protectedProcedure
    .input(
      z.object({
        event: z.string(),
        user: z.string(),
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
      const ticketMap = input.tiket.map((item) => ({
        ticketId: item.ticketId,
        totalticket: item.totalProduct,
      }));

      const ticketDetail = await ctx.xata.db.ticketdetail.create(ticketMap);

      const ticketId = ticketDetail.map((item) => item.id);
      await ctx.xata.db.purchase.create({
        events: input.event,
        totalPrice: input.totalPrice,
      });
    }),
});
