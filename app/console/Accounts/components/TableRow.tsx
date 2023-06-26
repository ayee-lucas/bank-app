"use client";

import React from "react";
import { AiOutlineUser, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Link from "next/link";

interface Prop {
  _id: any;
  accNumber: string;
  currency: string;
  balance: number;
  setId: React.Dispatch<React.SetStateAction<string>>;
}

const TableRow: React.FC<Prop> = ({
  _id,
  accNumber,
  currency,
  balance,
  setId
}) => {

  return (
    <tr className="hover:bg-gray-100">
      <th className="flex gap-3 px-5 py-4 font-normal text-gray-900">
        <AiOutlineUser className="w-8 h-8" />
        <div className="flex items-center font-medium text-md text-gray-700">
          {accNumber}
        </div>
      </th>
      <td className="px-6 py-4">{currency}</td>
      <td className="px-6 py-4">{balance}</td>
      <td className="px-6 py-4 w-10">
        <div className="flex justify-evenly gap-4">
          <Link
            href={`/console/AccountType/Edit/${_id}`}
            className="flex justify-center items-center w-7 h-7 mx-2"
          >
            <AiOutlineEdit className="w-6 h-6 transition duration-500 hover:w-7 hover:h-7 hover:text-blue-500" />
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
