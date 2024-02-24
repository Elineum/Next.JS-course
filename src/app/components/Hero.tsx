import React from "react";
import { Button } from "./Button";
import Image from "next/image";

export const Hero = () => {
  return (
    <section className="min-h-[400px] py-[80px] px-[15px] bg-[url('/hero-bg.png')] bg-cover bg-bottom">
      <div className="container-narrow flex justify-between">
        <div className="text-white">
          <h1 className="font-bold leading-none text-[54px] mb-[25px]">
            Чіп Чендж
          </h1>
          <p className="font-medium leading-none text-[20px] mb-[29px]">
            Обмінник валют - навчальний
          </p>
          <Button href="/converter" className="bg-white">
            Конвертер валют
          </Button>
        </div>
        <Image
          src={"/credit-card.png"}
          width={341}
          height={216}
          alt="credit-card"
        ></Image>
      </div>
    </section>
  );
};
