"use client";

import React, { useTransition, useState, useEffect } from "react";
import Image from "next/image";
import SideBarOptions from "@/app/Home/components/SideBarOptions";
import { RiSmartphoneLine } from "react-icons/ri";
import { signOut, useSession } from "next-auth/react";

import {
  AiOutlineHome,
  AiOutlineTeam,
  AiOutlineUser,
  AiOutlineDatabase,
  AiOutlineBank,
  AiOutlineFall,
  AiOutlineLogout,
} from "react-icons/ai";

import {
  BsArrowLeftRight,
  BsCurrencyDollar,
  BsFillBuildingFill,
} from "react-icons/bs";
import { getUserById } from "../actions";

interface IUserclient {
  name: string;
  username: string;
  phone: string;
  work: string;
  email: string;
}

const Sidebar = () => {
  const { data: session } = useSession();

  const userId = session?.user?.id.toString();

  const [isPending, startTransition] = useTransition();

  const [dropdown, setDropdown] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);

  const [user, setUser] = useState<IUserclient | null>(null);

  const [hoveringProfile, setHoveringProfile] = useState<boolean>(false);

  const [hoveringCard, setHoveringCard] = useState<boolean>(false);

  const [shadow, setShadow] = useState<string>("opacity-0 hidden");

  const handleMouseOver = () => {
    setOpen(true);

    setShadow("opacity-100");
  };

  const handleMouseOut = () => {
    setOpen(false);
    setDropdown(false);
    setShadow("opacity-0 hidden");
  };

  useEffect(() => {
    const getUser = () => {
      if(open) return

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
        } transition-all h-screen border-r border-violet-200 dark:border-zinc-800 overflow-y-auto overflow-x-hidden`}
      >
        <div
          className={`text-white h-full pt-6 bg-violet-100 dark:bg-zinc-950 z-50`}
        >
          <div className="flex flex-col w-full items-center justify-center cursor-pointer relative">
            <Image
              src={
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
              }
              className="rounded-full"
              width={60}
              height={60}
              alt="user photo"
              onMouseOver={() => setHoveringProfile(true)}
              onMouseOut={() =>
                setTimeout(() => setHoveringProfile(false), 1000)
              }
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
            <div
              className={`absolute transition-all duration-300 w-96 left-[120%]  text-gray-800  top-2 rounded-lg  
                 ${hoveringProfile && !open ? "top-0" : "top-[-540%]"} 
              `}
            >
              <div className="bg-violet-100/40 flex flex-col justify-center items-center shadow-xl backdrop-blur-lg backdrop-saturate-150 gap-4 overflow-y-auto">
                <Image
                  src={
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
                  }
                  className="rounded-full"
                  width={60}
                  height={60}
                  alt="user photo"
                />
                <h1 className="text-3xl font-semibold pt-5">{user?.name}</h1>
                <span className="text-xs bg-white py-1 px-2 rounded-full text-gray-500">
                  @{user?.username}
                </span>
                <span className="text-lg text-violet-600">{user?.email}</span>
                <p className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                  <BsFillBuildingFill />
                  {user?.work}
                </p>
                <p className="text-lg text-gray-700 flex items-center gap-2">
                  <RiSmartphoneLine />
                  {user?.phone}
                </p>
                <button className="w-full transition-all bg-violet-300 hover:bg-violet-500 text-violet-800 hover:text-white py-2 rounded-lg text-center font-semibold">
                  View Profile
                </button>
              </div>
            </div>
          </div>

          <ul className="space-y-2 mx-5 mt-28 font-medium ">
            <SideBarOptions
              onMouseOver={handleMouseOver}
              href="/console"
              icon={AiOutlineHome}
              name="Dashboard"
              isHovering={open}
            />
            <SideBarOptions
              onMouseOver={handleMouseOver}
              href="/console/Users"
              icon={AiOutlineTeam}
              name="Users"
              isHovering={open}
            />
            <SideBarOptions
              onMouseOver={handleMouseOver}
              href="/console/AccountType"
              icon={AiOutlineUser}
              name="Account Types"
              isHovering={open}
            />
            <SideBarOptions
              onMouseOver={handleMouseOver}
              href="/console/BankAccounts"
              icon={AiOutlineBank}
              name="Bank Accounts"
              isHovering={open}
            />

            <li className="bg-violet-200 dark:bg-zinc-900 rounded-xl text-violet-500 mb-2">
              <button
                onMouseOver={handleMouseOver}
                onClick={() => setDropdown(!dropdown)}
                className="w-full relative flex py-4 px-2 rounded-lg hover:underline hover:underline-offset-8"
              >
                <AiOutlineDatabase
                  className={`h-6 ${open ? "w-6" : "w-full"}`}
                />
                {open && (
                  <span className="flex-1 ml-3 whitespace-nowrap text-left">
                    Services
                  </span>
                )}
              </button>
            </li>

            <div
              className={`ml-2 transition duration-300 w-56 ${
                dropdown ? "translate-x-0" : "-translate-x-64"
              }`}
            >
              <SideBarOptions
                onMouseOver={handleMouseOver}
                href="/console/Transfer"
                icon={BsArrowLeftRight}
                name="Transfer"
                isHovering={open}
              />
            </div>
            <div
              className={`ml-2 transition duration-200 w-56 ${
                dropdown ? "translate-x-5" : "-translate-x-64"
              }`}
            >
              <SideBarOptions
                onMouseOver={handleMouseOver}
                href="/console/Deposit"
                icon={AiOutlineFall}
                name="Deposit"
                isHovering={open}
              />
            </div>
            <div
              className={`ml-2 transition duration-100 w-56 ${
                dropdown ? "translate-x-10" : "-translate-x-64"
              }`}
            >
              <SideBarOptions
                onMouseOver={handleMouseOver}
                href="/console/Buy"
                icon={BsCurrencyDollar}
                name="Buy"
                isHovering={open}
              />
            </div>
          </ul>

          <div
            className="absolute bottom-0 right-0 p-6"
            onMouseOver={() => setHoveringCard(true)}
          >
            <div className="flex justify-center">
              <div className="my-4 w-[90%] border-t border-gray-200 dark:border-zinc-700 lg:hidden" />
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 grid place-items-center bg-violet-200 hover:bg-red-600 transition-all ">
          <button
            className="w-full text-xl py-4 px-5 text-violet-600 dark:bg-zinc-900 hover:text-white flex items-center justify-center
          hover:before:content-['Logout'] hover:before:absolute hover:before:px-2 hover:before:py-1 hover:before:bg-violet-200 hover:before:dark:bg-zinc-900  hover:before:text-violet-600
          hover:before:text-center hover:before:text-sm hover:before:rounded-full hover:before:-translate-y-14 hover:before:duration-150 hover:before:transition-all
          "
            onClick={() => signOut()}
          >
            <AiOutlineLogout />
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
