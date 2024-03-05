import Link from "next/link";
import React, { MouseEventHandler } from "react";

interface IButtonProps {
  className?: string;
  children: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ className, children, onClick }: IButtonProps) => {
  return (
    <button
      {...(onClick ? { onClick } : {})}
      className={`px-[33px] py-5 font-medium text-[18px] rounded-[4px] bg-blue text-grey leading-none cursor-pointer inline-block ${
        className ? className : ""
      }`}
    >
      {children}
    </button>
  );
};
