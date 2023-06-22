"use client";

import React from "react";
import { AiOutlineUser, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Link from "next/link";
import { formatDate, updatedDate } from "@/app/tools/datesFormatter";

interface Prop {
  _id: string;
  account: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<string>>;
}

const TableRow: React.FC<Prop> = ({
  _id,
  account,
  amount,
  createdAt,
  updatedAt,
  setIsOpen,
  setId,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setId(_id);
    setIsOpen(true);
  };

  const formattedCreatedAt = formatDate(createdAt);
  const formattedUpdatedAt = updatedDate(updatedAt);

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
      <td className="px-6 py-4">{`${formattedUpdatedAt.formatedUpdateTime} ${formattedUpdatedAt.formatedUpdateDate}`}</td>
      <td className="px-6 py-4 w-10">
        <div className="flex justify-evenly gap-4">
          <Link
            href={`/console/Deposit/Edit/${_id}`}
            className="flex justify-center items-center w-7 h-7 mx-2"
          >
            <AiOutlineEdit className="w-6 h-6 transition duration-500 hover:w-7 hover:h-7 hover:text-blue-500" />
          </Link>
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