import Provider from "@/Provider";
import "./globals.css";
import { Mukta } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const mukta = Mukta({ weight:["400"], subsets: ["latin"]});

export const metadata = {
  title: "Novaris",
  description: "Online Bank",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark:dark overflow-x-hidden">
      <body className={mukta.className}>
        <Provider>{children}</Provider>
        <Toaster />
      </body>
    </html>
  );
}
