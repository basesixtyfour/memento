import { auth } from "@/auth";
import Profile from "./profile";
import { prisma } from "../lib/prisma";

const HomePage = async () => {
  const session = await auth();
  const email = session?.user?.email;
  const user = email
    ? await prisma.user.findUnique({
        where: { email },
      })
    : undefined;

  return (
    <Profile
      username={user?.name ?? ""}
      email={user?.email ?? ""}
    />
  );
};

export default HomePage;
