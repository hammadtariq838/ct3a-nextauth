import NextAuth, { type DefaultSession } from "next-auth";
import { UserRole, UserGroup } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "@/data/user";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      role: UserRole;
      group: UserGroup;
    } & DefaultSession["user"];
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user }) {
      const existingUser = user.id ? await getUserById(user.id) : null;

      if (!existingUser?.emailVerified) return false;

      return true;
    },
    async session({ token, session }) {
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email ?? "";

        if (token.sub) session.user.id = token.sub;

        if (token.role) session.user.role = token.role as UserRole;
        if (token.group) session.user.group = token.group as UserGroup;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.group = existingUser.group;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
