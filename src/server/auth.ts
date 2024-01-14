/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

import { env } from "@/env";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { XataAdapter } from "@next-auth/xata-adapter";
import { compare } from "bcrypt-ts";
import { XataClient } from "@/xata";
const client = new XataClient();

interface User {
  id: string;
  email: string;
  name: string | null;
  picture: string | null;
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string | null;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: XataAdapter(client),
  callbacks: {
    session: ({ session, token }) => {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.name = token.name;
      }
      return session;
    },
    jwt({ token, user, trigger, session }) {
      const u = user as unknown as User;

      if (trigger === "update" && session) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.name = session.name;
        token.picture = session.image;
      }
      if (user) {
        return {
          ...token,
          id: u.id,
          email: u.email,
          name: u.name,
          picture: u.picture,
        };
      }
      return token;
    },
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_ID,
      clientSecret: env.GOOGLE_SECRET,
    }),
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "signin",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        const user = await client.db.nextauth_users
          .filter({
            email: credentials.email,
          })
          .getFirst();

        if (!user?.hashedPassword) {
          throw new Error("User not found");
        }

        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword,
        );

        if (!isCorrectPassword) {
          throw new Error("Wrong password");
        }

        return user;
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
