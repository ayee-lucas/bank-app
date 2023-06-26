
import Link from "next/link";
import TableView from "./components/TableView";
import { IUser } from "@/app/models/User";
import { getUsers } from "./action";

export default async function AccountType() {

  const users:IUser[] = await getUsers();

  return (
    <div className="w-full h-full">

      <div className="p-6 text-3xl font-semibold text-violet-900 underline underline-offset-8">Users</div>
      
      <TableView users={users}/>

    </div>
  );
}