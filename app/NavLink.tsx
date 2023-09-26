"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function NavLink(props: {
  href: string;
  className?: string;
  activeClassName?: string;
  children: ReactNode;
}) {
  const pathName = usePathname();
  const { href, className, activeClassName, children } = props;
  return (
    <Link
      href={href}
      className={pathName.startsWith(href) ? activeClassName : className}
    >
      {children}
    </Link>
  );
}
