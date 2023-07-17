import { DataTable } from "./components/data-table";
import { columns } from "./components/columns-tsx";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getBuyById, getClientAccounts,  } from "./action";
import Delete from "./components/Delete";
import NewModal from "./components/NewModal";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const user = await getServerSession(authOptions);

  const allBuys:any = [];
  const accounts = await getClientAccounts(user?.user.username);

  //Level out the user's bank account purchases to a single level so that they can be mapped
  accounts.forEach((account: { buys: any[]; }) => {
    account.buys.forEach((buy: { _id: string; amount: number; senderAccount: string; recipient:string; description:string; createdAt: Date; updatedAt: Date; }) => {
      allBuys.push({
        _id: buy._id,
        amount: buy.amount,
        senderAccount: buy.senderAccount,
        recipient: buy.recipient,
        description: buy.description,
        createdAt: buy.createdAt,
        updatedAt: buy.updatedAt,
      });
    });
  });

  console.log(searchParams?.edit);

  let buyExists = null;

  if (searchParams?.edit) {
    buyExists = await getBuyById(searchParams?.edit);
    console.log(buyExists);

    if (!buyExists) {
      return <div>Buy not found</div>;
    }
  }

  console.log({ BUYS: allBuys });

  return (
    <div className="w-full h-full min-h-screen flex flex-col gap-3 p-10 overflow-y-auto">
      <div className="text-xl lg:text-3xl xl:text-6xl font-bold text-violet-600">
        Your Buys:
      </div>

      <Delete />

      {searchParams?.new && searchParams?.new == "true" && <NewModal />}

      <DataTable columns={columns} data={allBuys} />
    </div>
  );
}