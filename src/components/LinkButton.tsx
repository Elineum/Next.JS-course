import Link from "next/link";
import React from "react";

interface ILinkButtonProps {
  className?: string;
  children: string;
  href: string;
}

export const LinkButton = ({ className, children, href }: ILinkButtonProps) => {
  return (
    <Link
      href={href}
      className={`px-[33px] py-5 font-medium text-[18px] rounded-[4px] bg-blue text-grey leading-none cursor-pointer inline-block ${
        className ? className : ""
      }`}
    >
      {children}
    </Link>
  );
};
