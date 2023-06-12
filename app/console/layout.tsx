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
        <div className="bg-violet-50 w-screen ">{children}</div>
      </div>
    </section>
  );
}
