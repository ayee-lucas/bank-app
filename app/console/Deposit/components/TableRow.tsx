"use client";

import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { formatDate } from "@/app/tools/datesFormatter";

interface Prop {
  _id: string;
  account: string;
  amount: number;
  createdAt: Date;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<string>>;
}

const TableRow: React.FC<Prop> = ({
  _id,
  account,
  amount,
  createdAt,
  setIsOpen,
  setId,
}) => {

  const formattedCreatedAt = formatDate(createdAt);

  return (
    <tr className="hover:bg-gray-100">
      <th className="flex gap-3 px-5 py-4 font-normal text-gray-900">
        <AiOutlineUser className="w-8 h-8" />
        <div className="flex items-center font-medium text-md text-gray-700">
          {account}
        </div>
      </th>
      <td className="px-6 py-4">{`Q${amount}`}</td>
      <td className="px-6 py-4">{`${formattedCreatedAt.formatedTime} ${formattedCreatedAt.formatedDate}`}</td>
    </tr>
  );
};

export default TableRow;