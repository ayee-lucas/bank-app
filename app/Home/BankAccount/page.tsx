import NewModal from "./components/NewModal";
import { columns } from "./components/columns-tsx";
import { getBankAccounts } from "./action";
import { DataTable } from "./components/data-table";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const user = await getServerSession(authOptions);

  const bankAccount = await getBankAccounts(user?.user.username);
  console.log({BANK_ACCOUNTS: bankAccount})

  return (
    <div className="w-full h-full min-h-screen flex flex-col gap-3 p-10 overflow-y-auto">
      <div className="text-xl lg:text-3xl xl:text-6xl font-bold text-violet-600">
        Your Bank Accounts:
      </div>

      {searchParams?.new && searchParams?.new == "true" && <NewModal />}

      <DataTable columns={columns} data={bankAccount} />
    </div>
  );
}