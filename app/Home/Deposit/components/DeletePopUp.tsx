"use client";

import React, { useTransition } from "react";
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import { deleteDeposit } from "../action";

const DeletePopUp = ({
  isOpen,
  setIsOpen,
  _id,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  _id: string;
}) => {


  const id = _id.toString();

  console.log(id)

  const [isPending, startTransition] = useTransition();

  return (
    <div
      className={`fixed top-0 left-0 bg-black bg-opacity-10 right-0 z-50 md:inset-0 h-full ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="absolute top-1/3 left-1/3 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-end pt-6 pr-6 ">
            <button
              onClick={() => setIsOpen(false)}
              className="hover:text-gray-400"
            >
              <AiOutlineClose className="w-7 h-7" />
            </button>
          </div>
          <div className="px-6 pb-6 text-center">
            <div className="flex font-normal justify-center pb-2 text-gray-900">
              <AiOutlineDelete className="w-20 h-20" />
            </div>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this Deposit?
            </h3>
            <button
              type="button"
              onClick={() =>
                startTransition(() => {
                  deleteDeposit(id);
                  setIsOpen(false);
                })
              }
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Yes, I'm sure
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePopUp;