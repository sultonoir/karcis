import { z } from "zod";

export const profileSchema = z.object({
  email: z.string(),
  name: z.string(),
  about: z.string(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  tiktok: z.string().optional(),
});

export const eventSchema = z.object({
  image: z.string(),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  category: z.string(),
  tag: z.array(z.string()),
  date: z.object({
    start: z.date(),
    end: z.date(),
  }),
  time: z.string(),
  place: z.string(),
  location: z.string(),
  ticket: z
    .array(
      z.object({
        title: z.string(),
        price: z.string(),
        count: z.string(),
        description: z.string().optional(),
        isFree: z.boolean(),
      }),
    )
    .min(1, {
      message: "min have 1 ticket",
    }),
  desc: z.string({ required_error: "description not yet filled" }),
  term: z.string({ required_error: "description not yet filled" }),
  max: z.string({ required_error: "Max ticket not yet filled" }),
  oneBuy: z.boolean(),
});
