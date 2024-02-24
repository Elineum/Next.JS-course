import Link from "next/link";
import React from "react";

interface INavigationProps {
  column?: boolean;
}

export const Navigation = ({ column }: INavigationProps) => {
  return (
    <nav className={`flex leading-none ${column ? "" : "grow"}`}>
      <ul
        className={`flex gap-x-[50px] gap-y-[20px] text-grey ${
          column ? "flex-col" : ""
        }`}
      >
        <li className="text-[16px] transition-all ease-in-out duration-30 hover:text-blue">
          <Link href={"/"} className="block">
            Послуги
          </Link>
        </li>
        <li className="text-[16px] transition-all ease-in-out duration-30 hover:text-blue">
          <Link href={"/"} className="block">
            Конвертер валют
          </Link>
        </li>
        <li className="text-[16px] transition-all ease-in-out duration-30 hover:text-blue">
          <Link href={"/"} className="block">
            Контакти
          </Link>
        </li>
        <li className="text-[16px] transition-all ease-in-out duration-30 hover:text-blue">
          <Link href={"/"} className="block">
            Задати питання
          </Link>
        </li>
      </ul>
    </nav>
  );
};
