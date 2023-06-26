"use client";

import React from "react";
import { AiOutlineUser, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Link from "next/link";

interface Prop {
  _id: any;
  name: string;
  username: string;
  email: string;
  dpi: string;
  phone: string;
  work: string;
  salary: string;
  role: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<string>>;
}

const TableRow: React.FC<Prop> = ({
  _id,
  name,
  username,
  email,
  dpi,
  phone,
  work,
  salary,
  role,
  setIsOpen,
  setId,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setId(_id);
    setIsOpen(true);
  };

  return (
    <tr className="hover:bg-gray-100">
      <th scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <AiOutlineUser className="w-8 h-8" />
        <div className="pl-3">
           <div className="font-normal text-sm">{name}</div>
          <div className="font-normal text-gray-500">{dpi}</div>
        </div>
      </th>
      <th scope="row" className="items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <div className="pl-3">
           <div className="font-normal text-sm">{username}</div>
          <div className="font-normal text-gray-500">{email}</div>
        </div>
      </th>
      <td className="px-6 py-4">{phone}</td>
      <th scope="row" className="items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <div className="pl-3">
           <div className="font-normal text-sm">{work}</div>
          <div className="font-normal text-gray-500">${salary}</div>
        </div>
      </th>
      <td className="px-6 py-4">{role}</td>
      <td className="px-6 py-4 w-10">
        <div className="flex justify-evenly gap-4">
          <Link
            href={`/console/Users/Edit/${_id}`}
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
