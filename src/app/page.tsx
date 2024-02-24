import Image from "next/image";
import { Button } from "./components/Button";

export default function Home() {
  return (
    <section className="py-[80px] px-[15px] leading-none">
      <div className="container-narrow py-[40px] flex gap-x-[50px] justify-center items-center">
        <div className="max-w-[380px]">
          <h2 className="font-bold text-[40px] mb-[30px]">Конвертер валют</h2>
          <p className="leading-[140%] text-[20px] mb-[30px] text-[grey]">
            Переважна діяльність банківської групи за останні чотири звітні
            квартали становить 50 і більше відсотків.
          </p>
          <Button href="/converter" className={"text-white"}>
            Конвертувати валюту
          </Button>
        </div>
        <div>
          <Image
            src={"/intro-img.jpg"}
            height={314}
            width={436}
            alt="intro-image"
            className="block "
          ></Image>
        </div>
      </div>
    </section>
  );
}
