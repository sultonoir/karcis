import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { z } from "zod";
import slugify from "slugify";
import { TRPCError } from "@trpc/server";
import { createBlurHash } from "@/lib/blur";
import { transformImage } from "@xata.io/client";

export const postRouter = createTRPCRouter({
  getAllEvents: publicProcedure.query(async ({ ctx }) => {
    const events = await ctx.xata.db.events
      .select(["*", "author.*", "author.image"])
      .sort("xata.createdAt", "desc")
      .getMany();
    return events;
  }),
  postEvent: protectedProcedure
    .input(
      z.object({
        title: z.string().min(2, {
          message: "title must be at least 2 characters.",
        }),
        image: z.string({ required_error: "image has not been uploaded" }),
        date: z.object({
          start: z.date(),
          end: z.date(),
        }),
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
        desc: z.string({ required_error: "description not yet filled" }),
        term: z.string({ required_error: "description not yet filled" }),
        max: z.string(),
        oneBuy: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.desc === "" || input.term === "") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Description not yet filled",
        });
      }
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
        startDate: input.date.start,
        endDate: input.date.end,
        oneBuy: input.oneBuy,
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
        isFree: item.isFree,
        description: item.description,
      }));

      await ctx.xata.db.tikets.createOrReplace(tickets);
      const image = event.image?.url;
      const photoBlurURL = transformImage(image, {
        blur: 75,
        width: 100,
        height: 100,
      });

      const photoBlurHash = await createBlurHash(photoBlurURL ?? "");
      await ctx.xata.db.events.update(event.id, {
        blur: photoBlurHash,
      });
      return event.id;
    }),
  getPrice: publicProcedure
    .input(
      z.object({
        eventId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const price = await ctx.xata.db.tikets
        .filter({
          "event.id": input.eventId,
        })
        .select(["price"])
        .sort("price", "asc")
        .getFirst();
      return price;
    }),
  getEvent: publicProcedure
    .input(
      z.object({
        eventId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const event = await ctx.xata.db.events
        .filter("id", input.eventId)
        .select(["*", "author.*"])
        .getFirst();
      const ticket = await ctx.xata.db.tikets
        .filter({ "event.id": input.eventId })
        .sort("price", "asc")
        .getMany();
      return {
        event,
        ticket,
      };
    }),
});
