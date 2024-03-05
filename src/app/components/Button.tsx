import Link from "next/link";
import React from "react";

interface IButtonProps {
  className?: string;
  children: string;
}

export const Button = ({ className, children }: IButtonProps) => {
  return (
    <button
      className={`px-[33px] py-5 font-medium text-[18px] rounded-[4px] bg-blue text-grey leading-none cursor-pointer inline-block ${
        className ? className : ""
      }`}
    >
      {children}
    </button>
  );
};
