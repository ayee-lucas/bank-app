import TableView from "./components/TableView";
import { ITransfer } from "@/app/models/Transfer";
import { getTransfers } from "./action";

export default async function Transfer() {

  const transfers:ITransfer[] = await getTransfers();

  return (
    <div className="w-full h-full">

      <div className="text-3xl p-6 font-semibold text-violet-900 underline underline-offset-8">Transfers</div>
      
      <TableView transfers={transfers}/>

    </div>
  );
}