import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import TopBarDashboard from "./components/TopBarDashboard";
import { getUserById, getUsers } from "./actions";
import UsersHeaderCard from "./components/UsersHeaderCard";
import BankAccHeaderCard from "./components/BankAccHeaderCard";
import TransfersHeaderCard from "./components/TransfersHeaderCard";
import BuysHeaderCard from "./components/BuysHeaderCard";
import { Suspense } from "react";
import RecentTransfersTable from "./components/RecentTransfersTable";
import RecentUsersTable from "./components/RecentUsersTable";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const fetchUsers = await getUsers();

  return (
    <>
      <TopBarDashboard />

      <section
        className="dark:bg-gradient-to-br dark:from-violet-900/20 dark:from-10% dark:via-black dark:via-30%  dark:to-black dark:to-90%
      bg-gradient-to-br from-violet-900/10 from-10% via-violet-50 via-30% to-violet-50 to-90%
      "
      >
        <div className="w-full min-h-screen p-5 pt-20">
          <div className="w-full h-full flex flex-col items-start gap-5">
            <h1 className="text-7xl font-bold text-violet-500">Dashboard</h1>
            <h3 className="text-xl mt-14">
              Hey there {session?.user?.username} 👋
            </h3>
            <div className="w-full h-fit flex flex-wrap items-center justify-between max-lg:justify-center gap-3">
              <UsersHeaderCard className="max-lg:w-full max-lg:max-w-none" />
              <BankAccHeaderCard className="max-lg:w-full max-lg:max-w-none" />
              <TransfersHeaderCard className="max-lg:w-full max-lg:max-w-none" />
              <BuysHeaderCard className="max-lg:w-full max-lg:max-w-none" />
            </div>
          </div>
          <div className="w-full flex items-start gap-5 mt-10">
            <div className="w-full h-fit">
              <h1 className="text-xl py-2">Recent Transfers</h1>
              <RecentTransfersTable />
            </div>

            <div className="w-full h-fit">
              <h1 className="text-xl py-2">Recent Users</h1>
              <RecentUsersTable />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
