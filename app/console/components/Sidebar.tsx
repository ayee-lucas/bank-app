"use client";

import React, { useTransition, useState, useEffect } from "react";
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
import { getUserById } from "../actions";

interface IUserclient {
  name: string;
  username: string;
  phone: string;
  work: string;
}

const Sidebar = () => {
  const { data: session } = useSession();

  const userId = session?.user?.id.toString();

  const [isPending, startTransition] = useTransition();

  const [dropdown, setDropdown] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);

  const [user, setUser] = useState<IUserclient | null>(null);

  const [hoveringProfile, setHoveringProfile] = useState<boolean>(false);

  const [shadow, setShadow] = useState<string>("opacity-0 hidden");

  const handleMouseOver = () => {
    setOpen(true);

    setShadow("opacity-100");
  };

  const handleMouseOut = () => {
    setOpen(false);

    setShadow("opacity-0 hidden");
  };

  useEffect(() => {
    const getUser = () => {
      startTransition(async () => {
        const user = await getUserById(userId);
        setUser(user);
      });
    };

    getUser();
  }, [hoveringProfile]);

  console.log(user);

  return (
    <>
      {open && (
        <div
          className={`fixed z-10 inset-0 bg-black/70 transition-all ${shadow} cursor-pointer`}
          onClick={handleMouseOut}
        />
      )}

      <div
        className={`fixed z-20 ${
          open ? "w-[25rem]" : "w-28"
        } transition-all h-screen border-r border-violet-200 dark:border-zinc-800`}
      >
        <div
          className={`text-white h-full pt-6 bg-violet-100 dark:bg-violet-950 z-50`}
        >
          <div
            className="flex flex-col w-full items-center justify-center cursor-pointer relative"
            onMouseOver={() => setHoveringProfile(true)}
            onMouseOut={() => setHoveringProfile(false)}
          >
            <Image
              src={
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
              }
              className="rounded-full"
              width={60}
              height={60}
              alt="user photo"
            />
            <div
              className={`text-sm text-violet-700 font-semibold relative w-full ${
                open ? "block" : "hidden"
              }`}
            >
              <div className="absolute inset-x-0 mt-4 text-center">
                <p className="font-semibold text-3xl">
                  {session?.user.username}
                </p>
                <p>{session?.user.email}</p>
              </div>
            </div>
            {hoveringProfile && !open && (
              <div className="absolute w-72 flex flex-col bg-violet-100 px-5 py-2 text-gray-800 left-[110%] rounded-lg border border-violet-500">
                <div className="w-full flex items-center gap-3">
                  <h1 className="text-3xl font-semibold ">{user?.name}</h1>
                  <span className="text-sm text-violet-600">
                    @{user?.username}
                  </span>
                </div>
                  <p className="text-lg font-semibold text-gray-700">
                    {user?.work}
                  </p>
                  <p className="text-lg text-gray-700">
                    {user?.phone}
                  </p>

              </div>
            )}
          </div>

          <ul className="space-y-2 mx-5 mt-28 font-medium">
            <SideBarOptions
              onMouseOver={handleMouseOver}
              href="/console"
              icon={AiOutlineHome}
              name="Dashboard"
              isHovering={open}
            />
            <SideBarOptions
              onMouseOver={handleMouseOver}
              href="/console/AccountType"
              icon={AiOutlineUser}
              name="AccountType"
              isHovering={open}
            />
            <SideBarOptions
              onMouseOver={handleMouseOver}
              href="/console/Contact"
              icon={AiOutlinePhone}
              name="Contact"
              isHovering={open}
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
    </>
  );
};

export default Sidebar;
