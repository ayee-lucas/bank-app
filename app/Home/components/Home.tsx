"use client";

import { useSession } from "next-auth/react";
import React from "react";

const Home = () => {
  const { data: session } = useSession();

  return (
    <div className="w-full h-full min-h-screen flex flex-col gap-3 p-10 overflow-y-auto">
      <div className="text-xl lg:text-3xl xl:text-5xl font-bold text-violet-600">
        Welcome {session?.user.username}!
      </div>
    </div>
  );
};

export default Home;
