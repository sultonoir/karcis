import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { type NextauthUsers } from "@/xata";
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

      function emailToString(email: string): string {
        // Pisahkan alamat email menggunakan '@' sebagai pemisah
        const potongan = email.split("@");

        // Ambil nama depan (bagian pertama setelah pemisah '@')
        const namaDepan = potongan[0];

        return namaDepan!;
      }
      await ctx.xata.db.nextauth_users.create({
        email,
        name: emailToString(input.email),
      });
      return email;
    }),
  getUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.xata.db.nextauth_users.read(ctx.session.user.id);
    const record: NextauthUsers = JSON.parse(JSON.stringify(user));
    return record;
  }),
  updateUser: protectedProcedure
    .input(
      z.object({
        email: z.string(),
        name: z.string(),
        about: z.string(),
        facebook: z.string().optional(),
        instagram: z.string().optional(),
        twitter: z.string().optional(),
        tiktok: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const id = ctx.session.user.id;
      await ctx.xata.db.nextauth_users.update(id, input);
      return input.name;
    }),
  updateImage: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        mediaType: z.string().optional(),
        base64Content: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const id = ctx.session.user.id;
      const record = await ctx.xata.db.imageBucket.create({
        img: input,
      });
      await ctx.xata.db.nextauth_users.update(id, {
        image: record.img?.url,
        imageId: record.id,
      });
      return record.img?.url;
    }),
  removeImage: protectedProcedure.mutation(async ({ ctx }) => {
    const id = ctx.session.user.id;
    const user = await ctx.xata.db.nextauth_users.read(id);
    if (user?.imageId) {
      await ctx.xata.db.imageBucket.delete(user.imageId);

      await ctx.xata.db.nextauth_users.update(id, {
        image: null,
        imageId: null,
      });
    } else {
      await ctx.xata.db.nextauth_users.update(id, {
        image: null,
        imageId: null,
      });
    }
  }),
  updateBanner: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        mediaType: z.string().optional(),
        base64Content: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const id = ctx.session.user.id;
      await ctx.xata.db.nextauth_users.update(id, {
        banner: input,
      });
    }),
  removeBanner: protectedProcedure.mutation(async ({ ctx }) => {
    const id = ctx.session.user.id;
    await ctx.xata.db.nextauth_users.update(id, {
      banner: null,
    });
  }),
  getPublicProfile: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.xata.db.nextauth_users.read(input.id);
      const eventActive = await ctx.xata.db.events
        .select(["*", "author.*"])
        .filter({
          $all: [
            {
              startDate: { $ge: new Date() },
              author: input.id,
            },
          ],
        })
        .getMany();
      const pastEvent = await ctx.xata.db.events
        .select(["*", "author.*"])
        .filter({
          "author.id": input.id,
          startDate: { $le: new Date() },
        })
        .getMany();

      return {
        user,
        eventActive,
        pastEvent,
      };
    }),
});
