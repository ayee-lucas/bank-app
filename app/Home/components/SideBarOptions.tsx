import React, { FC } from 'react'
import Link from 'next/link';
import { Url } from 'next/dist/shared/lib/router/router';

interface Props {
    href: Url
    icon: React.ComponentType<any>
    name: String;
}

export const SideBarOptions: FC<Props> = ({ href, icon: Icon, name }) => {
  return (
    <li className=' bg-violet-300 rounded-xl'>
        <Link
            href={href}
            className="flex p-2 rounded-lg hover:underline hover:underline-offset-8"
        >
        <Icon className="w-6 h-6" />
        <span className="flex-1 ml-3 whitespace-nowrap">{name}</span>
        </Link>
    </li>
  )
}

export default SideBarOptions;
