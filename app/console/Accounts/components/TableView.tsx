"use client"

import React, { useState } from "react";
import TableRow from "./TableRow"
import DeletePopUp from "./DeletePopUp";
import { IBankAccount } from "@/app/models/BankAccount";

interface Props{
  bankAccounts: IBankAccount[]
}

const TableView: React.FC<Props> = ({bankAccounts}) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");


  return (
    <div className="overflow-y overflow-x-hidden table-auto overflow-scroll rounded-lg border border-gray-200 shadow-md m-5 max-h-[490px]">

      <DeletePopUp isOpen={isOpen} setIsOpen={setIsOpen} _id={id} />

      <table className="relative w-full border-collapse bg-white text-left text-sm text-gray-500 h-full ">
        <thead className=" bg-gray-50">
          <tr>
            <th scope="col" className="px-5 py-4 font-medium text-gray-900">Account Number</th>
            <th scope="col" className="px-5 py-4 font-medium text-gray-900">Currency</th>
            <th scope="col" className="px-5 py-4 font-medium text-gray-900">Balance</th>
            <th scope="col" className="px-5 py-4 font-medium text-gray-900">Client</th>
            <th scope="col" className="px-5 py-4 font-medium text-gray-900">Account Type</th>
            <th scope="col" className="px-5 py-4 font-medium text-gray-900">Options</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {bankAccounts.map((bankAccount: IBankAccount, key) => (
            <TableRow 
              _id={bankAccount._id}
              accNumber={bankAccount.accNumber}
              currency={bankAccount.currency}
              balance={bankAccount.balance}
              client={bankAccount.client?.name}
              accountType={bankAccount.accountType?.name}
              key={key} 
              setId={setId} />
          ))}
        </tbody>
      </table>
    </div>
    
  )
}

export default TableView