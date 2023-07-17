import Provider from "@/Provider";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./ThemeProvider";

const mukta = Inter({ weight: ["400"], subsets: ["latin"] });

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
        <Provider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
