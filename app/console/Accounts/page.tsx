import Link from "next/link";
import TableView from "./components/TableView";
import { IBankAccount } from "@/app/models/BankAccount";
import { getBankAccounts } from "./action";

export default async function Accounts() {

  const bankAccounts:IBankAccount[] = await getBankAccounts();

  return (
    <div className="w-full h-full">

      <div className="p-6 text-3xl font-semibold text-violet-900 underline underline-offset-8">Bank Accounts</div>

      <Link href="/console/Accounts/Add" className="mx-6 px-4 py-2 text-md font-semibold text-white-900 bg-violet-800 text-white rounded-xl max-w-fit hover:bg-violet-600">Add Account Type</Link>

      <TableView bankAccounts={bankAccounts}/>

    </div>
  );
}