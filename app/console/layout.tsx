import Sidebar from "./components/Sidebar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section >
      <div className="flex h-screen">
        <Sidebar/>
        <div className="bg-violet-50 w-screen p-2">{children}</div>
      </div>
    </section>
  );
}
