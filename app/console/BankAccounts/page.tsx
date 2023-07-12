import EditModal from "../../FormComponents/EditModal";
import Delete from "./components/Delete";
import NewModal from "./components/NewModal";
import { columns } from "./components/columns-tsx";
import { IBankAccount } from "@/app/models/BankAccount";
import { getBankAccountById, getBankAccounts } from "./action";
import BankAccFEdit from "./components/EditForm";
import { DataTable } from "./components/data-table";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const bankAccount: IBankAccount[] = await getBankAccounts();

  let bankAccountExists = null;

  console.log(searchParams?.edit);

  if (searchParams?.edit) {
    bankAccountExists = await getBankAccountById(searchParams?.edit);
    console.log(bankAccountExists);

    if (!bankAccountExists) {
      return <div>Bank Account not found</div>;
    }
  }

  return (
    <div className="w-full h-full min-h-screen flex flex-col gap-3 p-10 overflow-y-auto">
      <div className="text-2xl lg:text-4xl xl:text-7xl font-bold text-violet-600">
        Bank Accounts
      </div>
      <Delete />

      {searchParams?.edit && searchParams?.edit !== "" && (
        <EditModal
          title="Edit Bank Account"
          description="This action will edit the bank account and save it to the system."
          redirectOnClose="/console/BankAccounts"
          formFunction={<BankAccFEdit defaultValues={{ ...bankAccountExists }} />}
        />
      )}

      {searchParams?.new && searchParams?.new == "true" && <NewModal />}

      <DataTable columns={columns} data={bankAccount} />
    </div>
  );
}