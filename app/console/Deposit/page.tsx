import Link from "next/link";
import TableView from "../../Home/Deposit/components/TableView";
import { IDeposit } from "@/app/models/Deposit";
import { getDeposits } from "../../Home/Deposit/action";

export default async function DepositPage() {

  const deposits:IDeposit[] = await getDeposits();

  return (
    <div className="w-full h-full">
      <div className="w-full h-full">
        <div className="p-6 text-3xl font-semibold text-violet-900 underline underline-offset-8">Deposit</div>

        <Link href="/console/Deposit/Add" className="mx-6 px-4 py-2 text-md font-semibold text-white-900 bg-violet-800 text-white rounded-xl max-w-fit hover:bg-violet-600">Add Deposit</Link>

        <TableView deposits={deposits}/>

        </div>
    </div>
  );
  }