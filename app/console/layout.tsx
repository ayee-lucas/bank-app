import Sidebar from "./components/Sidebar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section >
        <Sidebar/>
        <div className="bg-violet-50 w-screen p-2 pl-28">{children}</div>
    </section>
  );
}
