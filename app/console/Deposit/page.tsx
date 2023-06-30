import { DataTable } from "./components/data-table";
import { columns } from "./components/columns-tsx";
import { IDeposit } from "@/app/models/Deposit";
import { getDepositById, getDeposits } from "./action";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const deposits: IDeposit[] = await getDeposits();

  let depositExists = null;

  console.log(searchParams?.edit);

  if (searchParams?.edit) {
    depositExists = await getDepositById(searchParams?.edit);
    console.log(depositExists);

    if (!depositExists) {
      return <div>Deposit not found</div>;
    }
  }

  return (
    <div className="w-full h-full min-h-screen flex flex-col gap-3 p-10 overflow-y-auto">
      <div className="text-2xl lg:text-4xl xl:text-7xl font-bold text-violet-600">
        Deposits
      </div>

      <DataTable columns={columns} data={deposits} />
    </div>
  );
}
