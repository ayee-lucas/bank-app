import Link from "next/link";
import TableView from "./components/TableView";
import { IDeposit } from "@/app/models/Deposit";
import { getDeposits } from "./action";

export default async function DepositPage() {

  const deposits:IDeposit[] = await getDeposits();

  return (
    <section className="dark:dark:bg-[#14062b] dark:text-white z-0 p-8 h-full w-full">

      <div className="flex justify-between w-full mt-6 px-5">
        <div className="text-3xl "> Deposits: </div>
        <Link
          href="/console/Deposit/Add"
          className="px-4 py-2 text-md font-semibold text-white-900 bg-violet-800 text-white rounded-xl max-w-fit hover:bg-violet-600"
        >
          New Deposit
        </Link>
      </div>

      <TableView deposits={deposits}/>

    </section>
  );
}
