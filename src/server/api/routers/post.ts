import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  getAllPosts: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.xata.db.Posts.getAll();
    return posts;
  }),
});
