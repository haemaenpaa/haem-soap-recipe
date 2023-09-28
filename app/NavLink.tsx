"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

/**
 * Navigation link. A client component that has a different CSS class name based on whether the href is a prefix of the current path.
 * @param props properties containing the href, class names and the child nodes to be rendered as a link.
 * @returns
 */
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
