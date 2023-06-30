import { DataTable } from "./components/data-table";
import { columns } from "./components/columns-tsx";
import { IBuy } from "@/app/models/Buy";
import { getBuyById, getBuys } from "./action";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const buys: IBuy[] = await getBuys();

  let buyExists = null;

  console.log(searchParams?.edit);

  if (searchParams?.edit) {
    buyExists = await getBuyById(searchParams?.edit);
    console.log(buyExists);

    if (!buyExists) {
      return <div>Buy not found</div>;
    }
  }

  return (
    <div className="w-full h-full min-h-screen flex flex-col gap-3 p-10 overflow-y-auto">
      <div className="text-2xl lg:text-4xl xl:text-7xl font-bold text-violet-600">
        Buys
      </div>

      <DataTable columns={columns} data={buys} />
    </div>
  );
}