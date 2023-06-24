"use client";

import React, { useState } from "react";
import Image from "next/image";
import SideBarOptions from "@/app/Home/components/SideBarOptions";
import DropDown from "@/app/Home/components/DropDown";
import { useSession } from "next-auth/react";

import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineDatabase,
  AiOutlinePhone,
  AiOutlineFall,
} from "react-icons/ai";

import { BsArrowLeftRight, BsCurrencyDollar } from "react-icons/bs";

const Sidebar = () => {
  const [dropdown, setDropdown] = useState(false);

  const { data: session } = useSession();

  return (
    <div className="z-20 min-w-fit w-[25rem] h-screen border-r border-violet-200 dark:border-zinc-800">
      <div className="text-white h-full pt-6 bg-violet-200 dark:bg-violet-950 z-50">
        <div className="flex pb-5 px-7">
          <button type="button" className="rounded-full">
            <Image
              src={
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
              }
              className="w-9 h-10 rounded-full"
              width={45}
              height={50}
              alt="user photo"
            />
          </button>
          <div className="ml-4 text-sm text-violet-700 font-semibold">
            <p>{session?.user.username}</p>
            <p>{session?.user.email}</p>
          </div>
        </div>

        <ul className="space-y-2 mx-5 font-medium">
          <SideBarOptions
            href="/console"
            icon={AiOutlineHome}
            name="Dashboard"
          />
          <SideBarOptions
            href="/console/AccountType"
            icon={AiOutlineUser}
            name="AccountType"
          />
          <SideBarOptions
            href="/console/Contact"
            icon={AiOutlinePhone}
            name="Contact"
          />

          <li>
            <button
              className="flex p-2 rounded-lg"
              onClick={() => setDropdown(!dropdown)}
            >
              <AiOutlineDatabase className="w-6 h-6" />
              <span className="flex-1 ml-3 text-left whitespace-nowrap">
                Services
              </span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>

          {dropdown ? (
            <div>
              <DropDown
                href="/console/Transfer"
                icon={BsArrowLeftRight}
                name="Transfer"
              />
              <DropDown
                href="/console/Deposit"
                icon={AiOutlineFall}
                name="Deposit"
              />
              <DropDown
                href="/console/Buy"
                icon={BsCurrencyDollar}
                name="Buy"
              />
            </div>
          ) : null}
        </ul>

        <div className="absolute bottom-0 right-0 p-6">
          <div className="flex justify-center">
            <div className="my-4 w-[90%] border-t border-gray-200 dark:border-zinc-700 lg:hidden" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
