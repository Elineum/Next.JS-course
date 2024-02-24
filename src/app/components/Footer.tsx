import React from "react";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="px-[15px] py-[60px] bg-[#F6F7FF]">
      <div className="flex justify-between container-wide">
        <div>
          <Logo className="mb-[18px]" />
          <p className="text-sm max-w-[185px] text-grey">
            04128, м.Київ, вул. Хрещатик, 19 Ліцензія НБУ №156 Ⓒ ПАТ ЧіпЧендж,
            2019-2023
          </p>
        </div>
        <div>
          <Navigation column={true} />
        </div>
        <div className="flex gap-x-[17px] items-start">
          <Image
            src={"/mobile.svg"}
            width={10}
            height={16}
            alt="mobile"
            className="pt-[5px] box-content"
          />
          <div className="text-black">
            <a
              href="tel:+3773"
              className="font-bold mb-[5px] text-[16px] transition-all ease-in-out duration-30 hover:text-blue"
            >
              3773
            </a>
            <p className="text-sm text-grey max-w-[150px]">
              Цілодобова підтримка
            </p>
          </div>
        </div>
        <div className="flex gap-x-[17px] items-start">
          <Image
            src={"/phone.svg"}
            width={16}
            height={16}
            alt="phone"
            className="pt-[5px] box-content"
          />
          <div className="text-black">
            <a
              href="tel:+88001112233"
              className="font-bold mb-[5px] text-[16px] transition-all ease-in-out duration-30 hover:text-blue"
            >
              8 800 111 22 33
            </a>
            <p className="text-sm text-grey max-w-[150px]">
              Безкожтовно для дзвінків в межах України
            </p>
          </div>
        </div>
        <ul className="flex gap-x-[15px]">
          <li>
            <Link href={"/"}>
              <Image
                src={"/facebook.svg"}
                alt="facebook"
                width={9}
                height={16}
              />
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <Image
                src={"/insta.svg"}
                alt="instagram"
                width={16}
                height={16}
              />
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <Image
                src={"/xwitter.svg"}
                alt="xwitter"
                width={16}
                height={13}
              />
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <Image
                src={"/youtube.svg"}
                alt="youtube"
                width={16}
                height={13}
              />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};
