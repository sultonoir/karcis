import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  getAllPosts: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.xata.db.Posts.sort(
      "xata.createdAt",
      "desc",
    ).getAll();
    return posts;
  }),
});
