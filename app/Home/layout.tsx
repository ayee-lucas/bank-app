import React from 'react';
import NavBar from './components/NavBar';
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation';

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  console.log(session?.user)

  if(!session?.user?.username){
    
    redirect("/auth/Login")
  }

  if(session?.user?.role != "user"){
    redirect("/console")
  }

  return (
    <section >
      <NavBar/>
      <div className="bg-violet-50 dark:bg-black h-screen">{children}</div>
    </section>
  );
}