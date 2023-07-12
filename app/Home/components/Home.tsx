"use client";

import { useSession } from "next-auth/react";
import React from "react";

const Home = () => {
  const { data: session } = useSession();

  return <div>Welcome {session?.user.username}</div>;
};

export default Home;
