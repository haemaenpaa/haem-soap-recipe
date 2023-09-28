import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavLink from "./NavLink";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Soap recipe thing",
  description:
    "Interactive soap recipe calculator made as an exercise in Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <h1>Soap calculator thingie.</h1>
          <div className="navbar">
            <NavLink href="/recipes" activeClassName="active">
              Recipe list
            </NavLink>
            <NavLink href="/calculator" activeClassName="active">
              Recipe calculator
            </NavLink>
            <NavLink href="/ingredients" activeClassName="active">
              Manage ingredients
            </NavLink>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
