import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { z } from "zod";
import slugify from "slugify";

export const postRouter = createTRPCRouter({
  getAllPosts: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.xata.db.events
      .sort("xata.createdAt", "desc")
      .getMany();
    return posts;
  }),
  postEvent: protectedProcedure
    .input(
      z.object({
        title: z.string().min(2, {
          message: "title must be at least 2 characters.",
        }),
        image: z.string({ required_error: "image has not been uploaded" }),
        startDate: z.date(),
        category: z.string(),
        location: z.string(),
        tag: z
          .array(z.string())
          .min(1, {
            message: "Add 1 keyword to make your event easy to find",
          })
          .max(5),
        time: z.string(),
        place: z.string(),
        ticket: z.array(
          z.object({
            title: z.string(),
            price: z.string(),
            count: z.string(),
            description: z.string().optional(),
            isFree: z.boolean(),
          }),
        ),
        desc: z.string(),
        term: z.string(),
        max: z.string(),
        oneBuy: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const event = await ctx.xata.db.events.create({
        title: input.title,
        description: input.desc,
        term: input.term,
        image: {
          name: "file.png",
          mediaType: "image/png",
          base64Content: input.image,
        },
        location: input.location,
        startDate: input.startDate,
        tag: input.tag,
        time: input.time,
        place: input.place,
        category: input.category,
        author: ctx.session.user.id,
        slug: slugify(input.title),
      });

      const tickets = input.ticket.map((item) => ({
        event: event.id,
        title: item.title,
        price: parseFloat(item.price),
        count: parseFloat(item.count),
        max: parseInt(input.max),
        oneBuy: input.oneBuy,
        description: item.description,
      }));

      const result = await ctx.xata.db.tikets.createOrReplace(tickets);
      if (!result) {
        console.log(result);
      }
    }),
});
