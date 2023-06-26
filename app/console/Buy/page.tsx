
import TableView from "./components/TableView";
import { getBuys } from "./action";
import { IBuy } from "@/app/models/Buy";

export default async function Buy() {

  const buys:IBuy[] = await getBuys();

  return (
    <div className="w-full h-full">

      <div className="p-6 text-3xl font-semibold text-violet-900 underline underline-offset-8">Buy</div>
      
      <TableView buys={buys}/>

    </div>
  );
}