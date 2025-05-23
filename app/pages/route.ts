import { prisma } from "@/app/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "../lib/withAuth";

export const POST = withAuth(async (req: NextRequest, session: Session) => {
  try {
    const data = await req.json();
    const page = await prisma.page.create({
      data: {
        id: data.id ?? undefined,
        userId: session.user!.id!,
      },
    });

    return NextResponse.json({ ...page, message: "Success" }, { status: 200 });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
      return NextResponse.json({ message: "Conflict" }, { status: 409 });
    }
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
});


