import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email } = input;
      const axisEmail = await ctx.xata.db.nextauth_users
        .filter({
          email,
        })
        .getFirst();
      if (axisEmail) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email has been used",
        });
      }

      await ctx.xata.db.nextauth_users.create({
        email,
      });
      return email;
    }),
});
