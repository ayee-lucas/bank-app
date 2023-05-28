'use client'

import { FC } from "react";
import { SessionProvider } from "next-auth/react";

interface props {
  children: React.ReactNode;
}

const Provider: FC<props> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;
