"use client";

import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { formatDate } from "@/app/tools/datesFormatter";

interface Prop {
  receiver: string;
  sender: string;
  amount: number;
  createdAt: Date;
}

const TableRow: React.FC<Prop> = ({
  receiver,
  sender,
  amount,
  createdAt
}) => {

  const formattedCreatedAt = formatDate(createdAt);

  return (
    <tr className="hover:bg-gray-100">
      <td className="px-5 py-4 font-normal text-gray-900">
        <div className="flex gap-3">
          <AiOutlineUser className="w-8 h-8" />
          <div className="flex items-center font-medium text-md text-gray-700">
            {receiver}
          </div>
        </div>
      </td>
      <td className="flex gap-3 px-5 py-4 font-normal text-gray-900">
          <div className="flex gap-3">
          <AiOutlineUser className="w-8 h-8" />
          <div className="flex items-center font-medium text-md text-gray-700">
            {sender}
          </div>
        </div>
      </td>
      <td className="px-6 py-4">${amount}</td>
      <td className="px-6 py-4">{`${formattedCreatedAt.formatedTime} ${formattedCreatedAt.formatedDate}`}</td>
    </tr>
  );
};

export default TableRow;
