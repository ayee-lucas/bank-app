import TableView from "../components/TableView";

export default async function AccountType() {

  return (
    <div className="w-full h-full">

      <div className="p-6 text-3xl font-semibold text-violet-900 underline underline-offset-8">AccountType</div>

      <button className="mx-6 px-4 py-2 text-md font-semibold text-white-900 bg-violet-800 text-white rounded-xl max-w-fit hover:bg-violet-600">Add Account Type</button>

      {/* <div
          className="fixed hidden top-0 left-0 bg-black bg-opacity-20 right-0 z-50 overflow-x-hidden overflow-y-auto md:inset-0 h-full"
        >
          <div className="absolute top-1/3 left-1/3 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex justify-end pt-6 pr-6">
                <AiOutlineClose/>
              </div>
              <div className="px-6 pb-6 text-center">
                <div className="flex font-normal justify-center pb-2 text-gray-900">
                  <AiOutlineDelete className="w-20 h-20"/>
                </div>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this product?
                </h3>
                <button
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                >
                  Yes, I'm sure
                </button>
                <button
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>  */}

      <div className="overflow-y overflow-x-hidden table-auto overflow-scroll rounded-lg border border-gray-200 shadow-md m-5 max-h-[500px]">
        <TableView/>
      </div>

    </div>
  );
}