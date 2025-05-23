import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export function withAuth(
  handler: (req: NextRequest, session: any) => Promise<NextResponse>
) {
  return async function (req: NextRequest) {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return handler(req, session);
  };
}
