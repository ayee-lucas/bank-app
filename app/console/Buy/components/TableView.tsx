"use client"

import React, { useState } from "react";
import TableRow from "./TableRow"
import DeletePopUp from "./DeletePopUp";
import { IBuy } from "@/app/models/Buy";

const TableView = ({buys}: {buys: IBuy[]}) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");

  return (
    <div className="overflow-y overflow-x-hidden table-auto overflow-scroll rounded-lg border border-gray-200 shadow-md m-5 max-h-[490px]">

      <DeletePopUp isOpen={isOpen} setIsOpen={setIsOpen} _id={id} />

      <table className="relative w-full border-collapse bg-white text-left text-sm text-gray-500 h-full ">
        <thead className=" bg-gray-50">
          <tr>
            <th scope="col" className="px-5 py-4 font-medium text-gray-900">Sender</th>
            <th scope="col" className="px-5 py-4 font-medium text-gray-900">Receiver</th>
            <th scope="col" className="px-5 py-4 font-medium text-gray-900">Amount</th>
            <th scope="col" className="px-5 py-4 font-medium text-gray-900">Description</th>
            <th scope="col" className="px-5 py-4 font-medium text-gray-900">Created At</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {buys.map((buys: IBuy, key) => (
            <TableRow 
              receiver={buys.senderAccount}
              sender={buys.recipient}
              description={buys.description}
              amount={buys.amount}
              createdAt={buys.createdAt}
              key={key} 
            />
          ))}
        </tbody>
      </table>
    </div>
    
  )
}

export default TableView