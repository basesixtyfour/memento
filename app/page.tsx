import { auth } from "@/auth";
import HomePage from "./components/Homepage";
import LandingPage from "./components/LandingPage";

const Home = async () => {
  const session = await auth();
  if (!session?.user) {
    return <LandingPage />;
  }

  return <HomePage />;
};

export default Home;
