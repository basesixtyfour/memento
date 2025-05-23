"use server";

import { auth } from "@/auth";
import { prisma } from "./prisma";
import { hash } from "bcryptjs";

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

export const updateUserName = async (
  _: string | undefined,
  formData: FormData
): Promise<string | undefined> => {
  try {
    const name = formData.get("username") as string;
    const session = await auth();
    const email = session?.user?.email;

    if (!name || !email) {
      return "Missing fields";
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return "user don't exist";
    }

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        name,
      },
    });

    return undefined;
  } catch (err) {
    console.log(err);
    return "An error occur";
  }
};
