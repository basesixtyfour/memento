import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";
import type { User } from "@/app/generated/prisma/client";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";
import { z } from "zod";

export async function getUser(email: string): Promise<User | null> {
  try {
    return await prisma.user.findUnique({ where: { email } });
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function verifyUserCredentials(
  email: string,
  password: string
): Promise<User | null> {
  const user = await getUser(email);
  
  if (!user) return null;

  const passwordsMatch = await bcrypt.compare(password, user.password);
  return passwordsMatch ? user : null;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const parsed = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);

          if (!parsed.success) {
            return null;
          }

          const { email, password } = parsed.data;

          try {
            const user = await verifyUserCredentials(email, password);
            return user;
          } catch (authError) {
            return null;
          }
        } catch (parseError) {
          return null;
        }
      },
    }),
  ],
});
