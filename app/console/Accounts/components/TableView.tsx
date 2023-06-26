"use client"

import React, { useState } from "react";
import TableRow from "./TableRow"
import DeletePopUp from "./DeletePopUp";
import { IBankAccount } from "@/app/models/BankAccount";

const TableView = ({bankAccounts}: {bankAccounts: IBankAccount[]}) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");

  return (
    <div className="overflow-y overflow-x-hidden table-auto overflow-scroll rounded-lg border border-gray-200 shadow-md m-5 max-h-[490px]">

      <DeletePopUp isOpen={isOpen} setIsOpen={setIsOpen} _id={id} />

      <table className="relative w-full border-collapse bg-white text-left text-sm text-gray-500 h-full ">
        <thead className=" bg-gray-50">
          <tr>
            <th scope="col" className="px-5 py-4 font-medium text-gray-900">Name</th>
            <th scope="col" className="px-5 py-4 font-medium text-gray-900">Description</th>
            <th scope="col" className="px-5 py-4 font-medium text-gray-900">Created At</th>
            <th scope="col" className="px-5 py-4 font-medium text-gray-900">Updated At</th>
            <th scope="col" className="px-5 py-4 font-medium text-gray-900 text-center">Options</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {bankAccounts.map((bankAccount: IBankAccount, key) => (
            <TableRow 
              _id={bankAccount._id}
              name={bankAccount.currency}
              description={bankAccount.currency}
              setIsOpen={setIsOpen}
              key={key} 
              setId={setId} />
          ))}
        </tbody>
      </table>
    </div>
    
  )
}

export default TableView