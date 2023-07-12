import { DataTable } from "./components/data-table";
import { columns } from "./components/columns-tsx";
import { ITransfer } from "@/app/models/Transfer";
import { getTransferById, getTransfers } from "./action";
import Delete from "./components/Delete";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const transfers: ITransfer[] = await getTransfers();

  let transferExists = null;

  console.log(searchParams?.edit);

  if (searchParams?.edit) {
    transferExists = await getTransferById(searchParams?.edit);
    console.log(transferExists);

    if (!transferExists) {
      return <div>Transfer not found</div>;
    }
  }

  return (
    <div className="w-full h-full min-h-screen flex flex-col gap-3 p-10 overflow-y-auto">
      <div className="text-2xl lg:text-4xl xl:text-7xl font-bold text-violet-600">
        Transfers
      </div>
      <Delete />

      <DataTable columns={columns} data={transfers} />
    </div>
  );
}