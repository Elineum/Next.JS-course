import React from "react";

interface IButtonProps {
  className?: string;
  children: string;
  href: string;
}

export const Button = ({ className, children, href }: IButtonProps) => {
  return (
    <a
      href={href}
      className={`px-[33px] py-[20px] font-medium text-[18px] rounded-[4px] bg-blue text-grey leading-none cursor-pointer inline-block ${
        className ? className : ""
      }`}
    >
      {children}
    </a>
  );
};
