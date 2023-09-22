import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Haemo's soap recipe thing",
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
          <h1>Haemo's soap calculator thing.</h1>
          <Link href="/calculator">Recipe calculator</Link>
          <Link href="/ingredients">Manage ingredients</Link>
        </header>
        {children}
      </body>
    </html>
  );
}
