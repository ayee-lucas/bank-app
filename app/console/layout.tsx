import Sidebar from "./components/Sidebar";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  const session = await getServerSession(authOptions);
  if (!session?.user?.sub) {
    return redirect("/auth/Login");
  }


  return (
    <section >
        <Sidebar/>
        <div className="bg-violet-50 dark:bg-black w-screen min-h-screen p-2 pl-28">{children}</div>
    </section>
  );
}
