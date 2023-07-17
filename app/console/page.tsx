import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import TopBarDashboard from "./components/TopBarDashboard";
import { getUsers } from "./actions";
import UsersHeaderCard from "./components/UsersHeaderCard";
import BankAccHeaderCard from "./components/BankAccHeaderCard";
import TransfersHeaderCard from "./components/TransfersHeaderCard";
import BuysHeaderCard from "./components/BuysHeaderCard";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session?.user);

  const fetchUsers = await getUsers();

  console.log(fetchUsers.data?.length);

  return (
    <>
      <TopBarDashboard />
      <div className="w-full min-h-screen p-5 pt-20">
        <div className="w-full h-full flex flex-col items-start gap-5">
          <h1 className="text-7xl font-bold text-violet-500">Dashboard</h1>
          <div className="w-full h-fit flex flex-wrap items-center justify-between max-lg:justify-center gap-3">
            <UsersHeaderCard className="max-lg:w-full max-lg:max-w-none" />
            <BankAccHeaderCard className="max-lg:w-full max-lg:max-w-none" />
            <TransfersHeaderCard className="max-lg:w-full max-lg:max-w-none" />
            <BuysHeaderCard className="max-lg:w-full max-lg:max-w-none" />
          </div>
        </div>
      </div>
    </>
  );
}
