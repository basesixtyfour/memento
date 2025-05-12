import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAuthPages = ["/login", "/sign-up"].some((route) =>
        nextUrl.pathname.startsWith(route)
      );
      const isOnHomePage = nextUrl.pathname === "/";

      if (isOnAuthPages && isLoggedIn) {
        return NextResponse.redirect(new URL("/", nextUrl));
      }

      if (isOnAuthPages || isOnHomePage) {
        return true;
      }

      return isLoggedIn;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
