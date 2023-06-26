"use client"

import React, { useState } from "react";
import TableRow from "./TableRow"
import DeletePopUp from "./DeletePopUp";
import { IUser } from "@/app/models/User";

const TableView = ({users}: {users: IUser[]}) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");

  return (
    <div className="overflow-y overflow-x-hidden table-auto overflow-scroll rounded-lg border border-gray-200 shadow-md m-5 max-h-[490px]">

      <DeletePopUp isOpen={isOpen} setIsOpen={setIsOpen} _id={id} />

      <table className="relative w-full border-collapse bg-white text-left text-sm text-gray-500 h-full ">
        <thead className=" bg-gray-50">
          <tr>
            <th scope="col" className="px-5 py-4 font-medium text-gray-900">Name</th>
            <th scope="col" className="px-5 py-4 font-medium text-gray-900">Username</th>
            <th scope="col" className="px-5 py-4 font-medium text-gray-900">Adress</th>
            <th scope="col" className="px-5 py-4 font-medium text-gray-900 text-center">Options</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {users.map((users: IUser, key) => (
            <TableRow 
              _id={users._id}
              name={users.name}
              username={users.username}
              description={users.address}
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