import Image from "next/image";
import Link from "next/link";

interface ILogoProps {
  className?: string;
}

export const Logo = ({ className }: ILogoProps) => {
  return (
    <Link
      href={"/"}
      className={`flex items-center gap-x-[12px] ${className ? className : ""}`}
    >
      <Image src="/logo.png" alt="logo" width={23} height={23} />
      <p className="font-bold text-[20px] leading-none text-black">Чіп Чендж</p>
    </Link>
  );
};
