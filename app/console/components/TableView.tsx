"use client"

import React, { useState, useEffect, createContext } from "react";
import TableRow from "../components/TableRow";
import { IAccountType } from "@/app/models/AccountType";

export interface TableViewContextType {
    setAccount?: React.Dispatch<React.SetStateAction<string | undefined>>;
    handleMenu?: (selectedAccount: string) => void;
  }

const TableView = () => {

  const [accounts, setAccounts] = useState<IAccountType[]>([]);

  useEffect(() => {
    async function getAccountTypes() {
      const res = await fetch(`/api/accountType`, {
        next: { revalidate: 100 },
      });

      if (!res.ok) throw new Error(res.statusText);

      const accounts: IAccountType[] = await res.json();
      setAccounts(accounts);
      console.log(accounts);
    }

    getAccountTypes();
  }, []);

  return (
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500 h-96">
            <thead className="bg-gray-50">
            <tr>
                <th scope="col" className="px-5 py-4 font-medium text-gray-900">Name</th>
                <th scope="col" className="px-5 py-4 font-medium text-gray-900">Description</th>
                <th scope="col" className="px-5 py-4 font-medium text-gray-900">Created At</th>
                <th scope="col" className="px-5 py-4 font-medium text-gray-900">Updated At</th>
                <th scope="col" className="px-5 py-4 font-medium text-gray-900 text-center">Options</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {accounts.map((account: IAccountType, key) => (
                    <TableRow name={account.name} description={account.description} createdAt={account.createdAt} updatedAt={account.updatedAt} key={key}/>
                ))}
            </tbody>
        </table>
  )
}

export default TableView