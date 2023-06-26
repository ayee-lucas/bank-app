"use client";

import React from "react";
import { AiOutlineUser, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Link from "next/link";
import { formatDate } from "@/app/tools/datesFormatter";

interface Prop {
  _id: any;
  receiver: string;
  sender: string;
  amount: number;
  createdAt: Date;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<string>>;
}

const TableRow: React.FC<Prop> = ({
  _id,
  receiver,
  sender,
  amount,
  createdAt,
  setIsOpen,
  setId,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setId(_id);
    setIsOpen(true);
  };

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
      <td className="px-6 py-4 w-10">
        <div className="flex justify-center gap-4">
          <button
            className="flex justify-center items-center w-7 h-7"
            onClick={(e) => handleClick(e)}
          >
            <AiOutlineDelete className="w-6 h-6 transition duration-500 hover:w-7 hover:h-7 hover:text-red-500 " />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
