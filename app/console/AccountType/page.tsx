
import Link from "next/link";
import { getAccountById, getAccountTypes } from "./action";
import { IAccountType } from "@/app/models/AccountType";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns-tsx";
import Delete from "./components/Delete";
import NewModal from "./components/NewModal";
import EditModal from "../../FormComponents/EditModal";
import AccTypeFEdit from "./components/EditForm";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const accounts: IAccountType[] = await getAccountTypes();

  let accountExists = null;

  console.log(searchParams?.edit);

  if (searchParams?.edit) {
    accountExists = await getAccountById(searchParams?.edit);
    console.log(accountExists);

    if (!accountExists) {
      return <div>Account not found</div>;
    }
  }

  return (
    <div className="w-full h-full min-h-screen flex flex-col gap-3 p-10 overflow-y-auto">
      <div className="text-2xl lg:text-4xl xl:text-7xl font-bold text-violet-600">
        Account Types
      </div>
      <Delete />

      {searchParams?.edit && searchParams?.edit !== "" && (
        <EditModal
          title="Edit Account type"
          description="This action will edit the account type and save it to the system."
          redirectOnClose="/console/AccountType"
          formFunction={<AccTypeFEdit defaultValues={{ ...accountExists }} />}
        />
      )}

      {searchParams?.new && searchParams?.new == "true" && <NewModal />}

      <DataTable columns={columns} data={accounts} />
    </div>
  );
}
