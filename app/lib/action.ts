"use server";

import { signIn } from "@/auth";
import { prisma } from "./prisma";
import { hash } from "bcryptjs";

export const authenticate = async (
  _: string | undefined,
  formData: FormData
): Promise<string | undefined> => {
  try {
    await signIn("credentials", formData);
    return undefined;
  } catch (err) {
    if (err === "CredentialsSignin") {
      return "Invalid credentials";
    }

    throw err;
  }
};

export const signUpUser = async (
  _: string | undefined,
  formData: FormData
): Promise<string | undefined> => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return "Missing fields";
    }

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return "User already exists";
    }

    const hashedPassword = await hash(password, 10);
    await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    return undefined;
  } catch (err) {
    console.error("Error in signUpUser server action:", err);
    if (err instanceof Error) {
      return "An unexpected error occurred: " + err.message;
    }
    return "An unknown error occurred.";
  }
};
