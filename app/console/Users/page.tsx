import EditModal from "../../FormComponents/EditModal";
import { IUser } from "@/app/models/User";
import { getUserById, getUsers } from "./action";
import Delete from "./components/Delete";
import UserEdit from "./components/EditForm";
import NewModal from "./components/NewModal";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns-tsx";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const users: IUser[] = await getUsers();

  let userExists = null;

  console.log(searchParams?.edit);

  if (searchParams?.edit) {
    userExists = await getUserById(searchParams?.edit);
    console.log(userExists);

    if (!userExists) {
      return <div>User not found</div>;
    }
  }

  return (
    <div className="w-full h-full min-h-screen flex flex-col gap-3 p-10 overflow-y-auto">
      <div className="text-2xl lg:text-4xl xl:text-7xl font-bold text-violet-600">
        Users
      </div>
      <Delete />

      {searchParams?.edit && searchParams?.edit !== "" && (
        <EditModal
          title="Edit User"
          description="This action will edit the user and save it to the system."
          redirectOnClose="/console/Users"
          formFunction={<UserEdit defaultValues={{ ...userExists }} />}
        />
      )}

      {searchParams?.new && searchParams?.new == "true" && <NewModal />}

      <DataTable columns={columns} data={users} />
    </div>
  );
}