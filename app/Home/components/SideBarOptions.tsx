import React, { FC } from "react";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";

interface Props {
  href: Url;
  icon: React.ComponentType<any>;
  name: String;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isHovering?: boolean;
}

export const SideBarOptions: FC<Props> = ({
  href,
  icon: Icon,
  name,
  isHovering,
  setOpen,
}) => {
  return (
    <li className="bg-violet-200 dark:bg-zinc-900 rounded-xl text-violet-500 mb-2">
      <Link
        href={href}
        className="relative flex items-center justify-center py-4 px-2 rounded-lg hover:underline hover:underline-offset-8 "
        onClick={() => setOpen(false)}
      >
        <Icon className="w-6 h-6" />
        {isHovering && (
          <span className="flex-1 ml-3 whitespace-nowrap w-fit">{name}</span>
        )}
      </Link>
    </li>
  );
};

export default SideBarOptions;
