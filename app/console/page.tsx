import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  console.log(session?.user);
  return (
    <div className="w-full h-full">
      Dashboard
    </div>
  );
}
