import TableView from "../components/TableView";

export default async function AccountType() {

  return (
    <div className="w-full h-full">

      <div className="p-6 text-3xl font-semibold text-violet-900 underline underline-offset-8">AccountType</div>

      <button className="mx-6 px-4 py-2 text-md font-semibold text-white-900 bg-violet-800 text-white rounded-xl max-w-fit hover:bg-violet-600">Add Account Type</button>

      <TableView/>

    </div>
  );
}