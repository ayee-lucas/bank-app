import { DataTable } from "./components/data-table";
import { columns } from "./components/columns-tsx";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getClientDeposits } from "./action";

export default async function Page() {

  const user = await getServerSession(authOptions);
  console.log({USER: user})

  const allDeposits:any = [];
  const accounts = await getClientDeposits(user?.user.username);
  console.log({ACCOUNTS: accounts})

  //Level out the user's bank account deposits to a single level so that they can be mapped
  accounts.forEach((account: { deposits: any[]; }) => {
    account.deposits.forEach((deposit: { _id: string; amount: number; account: string; createdAt: Date; updatedAt: Date; }) => {
      allDeposits.push({
        _id: deposit._id,
        amount: deposit.amount,
        account: deposit.account,
        createdAt: deposit.createdAt,
        updatedAt: deposit.updatedAt,
      });
    });
  });

  console.log({ DEPOSITS: allDeposits });

  return (
    <div className="w-full h-full min-h-screen flex flex-col gap-3 p-10 overflow-y-auto">
      <div className="text-xl lg:text-3xl xl:text-6xl font-bold text-violet-600">
        Your Deposits:
      </div>

      <DataTable columns={columns} data={allDeposits} />
    </div>
  );
}