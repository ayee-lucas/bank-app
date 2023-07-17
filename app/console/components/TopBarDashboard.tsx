import { FC } from "react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { DarkModeToggle } from "./DarkModeToggle";

const poppins = Poppins({ weight: ["400"], subsets: ["latin"] });

type TopBarDashboardProps = {};

const TopBarDashboard: FC<TopBarDashboardProps> = ({}) => {
  return (
    <nav className="absolute top-0 inset-x-0 bg-violet-200 dark:bg-zinc-900 text-white py-4 px-2 text-center">
      <ul className="flex justify-end items-center w-full gap-3">
        <li
          className={`text-lg font-bold text-violet-600 ${poppins.className}`}
        >
          <Link href={"/console"}>Overview</Link>
        </li>
        <li
          className={`text-lg font-bold text-violet-600 ${poppins.className}`}
        >
          <Link href={"/console/settings"}>Settings</Link>
        </li>
        <li>
          <DarkModeToggle />
        </li>
      </ul>
    </nav>
  );
};

export default TopBarDashboard;
