import { DataTable } from "./components/data-table";
import { columns } from "./components/columns-tsx";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getClientAccounts, getTransferById } from "./action";
import Delete from "./components/Delete";
import NewModal from "./components/NewModal";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const user = await getServerSession(authOptions);
  console.log({USER: user})

  const allTransfers:any = [];
  const accounts = await getClientAccounts(user?.user.username);
  console.log({ACCOUNTS: accounts})

  //Nivelar los depositos de las cuentas a un nivel de array de objetos
  accounts.forEach((account: { transfers: any[]; }) => {
    account.transfers.forEach((transfer: { _id: string; amount: number; senderAccount: string; receiverAccount:string; createdAt: Date; updatedAt: Date; }) => {
      allTransfers.push({
        _id: transfer._id,
        amount: transfer.amount,
        senderAccount: transfer.senderAccount,
        receiverAccount: transfer.receiverAccount,
        createdAt: transfer.createdAt,
        updatedAt: transfer.updatedAt,
      });
    });
  });

  console.log(searchParams?.edit);

  let transferExists = null;

  if (searchParams?.edit) {
    transferExists = await getTransferById(searchParams?.edit);
    console.log(transferExists);

    if (!transferExists) {
      return <div>Transfer not found</div>;
    }
  }

  console.log({ TRANSFERS: allTransfers });

  return (
    <div className="w-full h-full min-h-screen flex flex-col gap-3 p-10 overflow-y-auto">
      <div className="text-xl lg:text-3xl xl:text-5xl font-bold text-violet-600">
        Your Transfers:
      </div>

      <Delete />

      {searchParams?.new && searchParams?.new == "true" && <NewModal />}

      <DataTable columns={columns} data={allTransfers} />
    </div>
  );
}