import navList from "@/consts/navList";
import Link from "next/link";
import React from "react";

interface INavigationProps {
  column?: boolean;
}

export const Navigation = ({ column }: INavigationProps) => {
  return (
    <nav className={`flex leading-none ${column ? "" : "grow"}`}>
      <ul
        className={`flex gap-x-[50px] gap-y-5 text-grey ${
          column ? "flex-col" : ""
        }`}
      >
        {navList.map((navItem, index) => {
          const { href, text } = navItem;

          return (
            <li
              className="text-[16px] transition-all ease-in-out duration-30 hover:text-blue"
              key={index}
            >
              <Link href={href} className="block">
                {text}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
