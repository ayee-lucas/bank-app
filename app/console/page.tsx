import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Dashboard from "./components/Dashboard";


export default async function Home() {
  const session = await getServerSession(authOptions);

  console.log(session?.user);
  
  return (
    <div className="w-full h-full dark:bg-zinc-900">
    <Dashboard></Dashboard>
    </div>
  );
}
