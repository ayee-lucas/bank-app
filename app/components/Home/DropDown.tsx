import React, { FC } from "react";
import Link from "next/link";
import { Url } from 'next/dist/shared/lib/router/router';

interface Props {
    href: Url
    icon: React.ComponentType<any>
    name: String;
}

export const DropDown: FC<Props> = ({ href, icon: Icon, name }) => {
  return (
    <li>
      <Link
        href={href}
        className="flex p-2 pl-10 rounded-lg hover:underline hover:underline-offset-8"
      >
        <Icon className="w-5 h-5" />
        <span className="flex-1 ml-3 whitespace-nowrap">{name}</span>
      </Link>
    </li>
  );
};

export default DropDown;
