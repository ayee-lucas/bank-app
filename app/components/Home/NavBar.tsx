"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/Images/Logos/NovarisLogoWhite.png";

export const NavBar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState(false);

  return (
    <>
      <div className="fixed w-full z-50">
        <nav className="bg-violet-700 border-b border-violet-200 dark:border-violet-400">
          <div className="min-h-[60px] flex flex-wrap items-center justify-between mx-auto p-2 px-6">

            <div
              /*onClick={() => setOpen(!open)}*/ aria-hidden="true"
              className="flex items-center"
            >
              <Link href="/Home" className="flex items-center">
                <Image src={logo} width={40} height={40} alt="Logo" />
                <span className="text-white self-center text-2xl pl-1 font-semibold whitespace-nowrap max-sm:hidden">
                  Novaris
                </span>
              </Link>
            </div>

            <ul className="text-white flex flex-row font-medium bg-violet-700 space-x-2 dark:border-gray-700 max-sm:hidden">
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 rounded hover:text-gray-300" aria-current="page">Home</a>
              </li>
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 rounded hover:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
              </li>
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 rounded hover:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
              </li>
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 rounded hover:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
              </li>
            </ul>

            {/*User Menu*/}

            <div className="z-50 flex items-center">
                <div className="flex">
                  <button
                    onClick={() => setOpen(!open)}
                    type="button"
                    className="flex mr-3 text-sm rounded-full lg:mr-0"
                  >
                    <Image
                      src={"https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"}
                      className="w-9 h-10 rounded-full"
                      width={45}
                      height={50}
                      alt="user photo"
                    />
                  </button>
                </div>

                <div
                  className={`absolute  border border-gray-200 dark:border-violet-500 top-[60px] lg:right-0 max-lg:hidden m-3 transition-transform text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-violet-700 dark:divide-gray-600 
                   ${open ? "translate-x-0" : "translate-x-52"}`}
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-xs text-gray-900 dark:text-white">
                      Username
                    </span>
                    <span className="block text-xs  text-gray-500 truncate dark:text-gray-400">
                      email@gmail.com
                    </span>
                  </div>
                  <ul className="py-2">
                    <li>
                      <Link
                        href="/Home"
                        className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Notifications
                      </Link>
                    </li>
                    {theme ? (
                      <li>
                        <button
                          type="button"
                          onClick={() => setTheme(!theme)}
                          className="w-full text-left block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Light Theme
                        </button>
                      </li>
                    ) : (
                      <li>
                        <button
                          type="button"
                          onClick={() => setTheme(!theme)}
                          className="w-full text-left block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Dark Theme
                        </button>
                      </li>
                    )}
                    <li>
                      <Link
                        href="/Home"
                        className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Sign out
                      </Link>
                    </li>
                  </ul>
              </div>
            </div>
                      
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
