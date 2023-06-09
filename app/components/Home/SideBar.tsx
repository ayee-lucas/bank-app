'use client'

import React, { FC, useState } from 'react'
import Image from 'next/image';
import SideBarOptions from './SideBarOptions';
import DropDown from './DropDown';
import {
    AiOutlineHome,
    AiOutlineBook,
    AiOutlineDatabase,
    AiOutlinePhone,
    AiOutlineClose,
    AiOutlineFall,
    AiOutlineSetting,
} from 'react-icons/ai';

import { BsMoon, BsSun, BsArrowLeftRight, BsCurrencyDollar } from 'react-icons/bs';

interface Props {
    close: () => void
}

export const SideBar: FC<Props> = ({ close }) => {

const [theme, setTheme] = useState(true);
const [dropdown, setDropdown] = useState(false);

  return (
    <div className="text-white h-full px-1 pt-5 bg-violet-950 dark:bg-violet-950">
      <div className="flex font-medium text-sm justify-between">
            
           <button type="button" className="p-2 text-2xl px-4 dark:text-white">
            <AiOutlineClose onClick={close} />
            </button>
 
          <div className='flex pr-5'>
            <div className="mr-3 text-right text-md dark:text-white">
              <p>username</p>
              <p>email@gmail.com</p>
            </div>

            <button
              type="button"
              className="max-xsm:hidden rounded-full"
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

        </div>

      <div className="flex justify-center">
        <div className="my-4 w-[90%] border-t border-gray-200 dark:border-zinc-700 lg:hidden" />
      </div>

      <ul className="space-y-2 mx-5 font-medium">

        <SideBarOptions href="/Home" icon={AiOutlineHome} name="Home"/>
        <SideBarOptions href="/Home" icon={AiOutlineBook} name="About"/>
        <SideBarOptions href="/Home" icon={AiOutlinePhone} name="Contact"/>

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
            <DropDown href="/Home" icon={BsArrowLeftRight} name="Transfer"/>
            <DropDown href="/Home" icon={AiOutlineFall} name="Deposit"/>
            <DropDown href="/Home" icon={BsCurrencyDollar} name="Buy"/>
          </div>
        ) : (null)}

      </ul>

      <div className="flex justify-center">
        <div className="my-4 w-[90%] border-t border-gray-200 dark:border-zinc-700 lg:hidden" />
      </div>

      <div className="absolute bottom-0 right-0 p-6">
        <div className="flex justify-center">
          <div className="my-4 w-[90%] border-t border-gray-200 dark:border-zinc-700 lg:hidden" />
        </div>

        {theme ? (
          <button
            type="button"
            onClick={() => setTheme(!theme)}
            className="flex p-2 rounded-lg text-white"
          >
            <BsMoon className="w-6 h-6" />
            <span className="flex-1 ml-3 whitespace-nowrap">Dark Theme</span>
        </button>
        ) : (
          <button
            type="button"
            onClick={() => setTheme(!theme)}
            className="flex p-2 rounded-lg text-white"
          >
            <BsSun className="w-6 h-6" />
            <span className="ml-3 whitespace-nowrap">Light Theme</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default SideBar;