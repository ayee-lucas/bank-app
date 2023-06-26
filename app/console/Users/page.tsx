
import Link from "next/link";
import TableView from "./components/TableView";
import { IUser } from "@/app/models/User";
import { getUsers } from "./action";

export default async function AccountType() {

  const users:IUser[] = await getUsers();

  return (
    <div className="w-full h-full">

      <div className="p-6 text-3xl font-semibold text-violet-900 underline underline-offset-8">Users</div>

      <Link href="/console/Users/Add" className="mx-6 px-4 py-2 text-md font-semibold text-white-900 bg-violet-800 text-white rounded-xl max-w-fit hover:bg-violet-600">Add AUser</Link>
      
      <TableView users={users}/>

    </div>
  );
}