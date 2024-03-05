import React from "react";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import Link from "next/link";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="px-[15px] py-[34px]">
      <div className="container-wide flex gap-x-[60px] items-center">
        <Logo />
        <Navigation />
        <Link
          href={"/"}
          className="flex gap-x-[15px] text-black transition-all ease-in-out duration-30 hover:text-blue"
        >
          <Image src="/login-icon.svg" width={20} height={22} alt="" />
          <p>Особистий кабінет</p>
        </Link>
      </div>
    </header>
  );
};
