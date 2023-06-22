import TableView from "./components/TableView";
import Link from "next/link";
import { getAccountTypes } from "./action";
import { IAccountType } from "@/app/models/AccountType";

export default async function AccountType() {

  const accounts:IAccountType[] = await getAccountTypes();

  return (
    <div className="w-full h-full">

      <div className="p-6 text-3xl font-semibold text-violet-900 underline underline-offset-8">AccountType</div>

      <Link href="/console/AccountType/Add" className="mx-6 px-4 py-2 text-md font-semibold text-white-900 bg-violet-800 text-white rounded-xl max-w-fit hover:bg-violet-600">Add Account Type</Link>

      <TableView accounts={accounts}/>

    </div>
  );
}