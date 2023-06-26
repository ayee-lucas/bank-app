import { IDeposit } from "@/app/models/Deposit";
import { getDeposits } from "./action";
import TableView from "./components/TableView";

export default async function DepositPage() {

  const deposits:IDeposit[] = await getDeposits();

  return (
    <section className="dark:dark:bg-[#14062b] dark:text-white z-0 p-8 h-full w-full">

      <div className="text-3xl mt-6 px-5"> Deposits: </div>

      <TableView deposits={deposits}/>

    </section>
  );
}
