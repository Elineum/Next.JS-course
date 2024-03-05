"use client";
import { useConverterStore } from "@/store/application.store";
import Image from "next/image";
import React from "react";
import { Button } from "./Button";

export const ConvertHistory = () => {
  const { changesHistory, clearHistory } = useConverterStore();

  return (
    <section className="bg-#ffffff px-[15px] py-20 leading-none">
      <div className="container-medium bg-white pt-10 px-12 pb-[58px]">
        <div className="flex justify-between mb-[32px] items-center">
          <h2 className="font-medium text-[28px] text-black ">
            Історія конвертації
          </h2>
          <Button onClick={clearHistory} className="text-[#F6F7FF]">
            Очистити історію
          </Button>
        </div>
        {changesHistory.length > 0 ? (
          <ul className="flex gap-y-[16px] gap-x-[48px] flex flex-wrap">
            {changesHistory.map(
              (
                { date, iGetAmount, iGetSelect, iHaveAmount, iHaveSelect },
                index
              ) => (
                <li
                  key={index}
                  className="bg-[#FFFFFF] rounded-[2px] flex items-center gap-x-[15px] p-[15px] w-[100%]  max-w-[392px]"
                >
                  <span className="text-[#C1C2CA]">{date}</span>
                  <span className="text-[#707C87] font-semibold">
                    {iHaveAmount} {iHaveSelect.label}
                  </span>
                  <Image
                    src={"/history-arrow.png"}
                    alt="arrow"
                    width={14}
                    height={10}
                    className="h-fit"
                  />
                  <span className="text-[#707C87] font-semibold">
                    {iGetAmount} {iGetSelect.label}
                  </span>
                </li>
              )
            )}
          </ul>
        ) : (
          <p>No history now</p>
        )}
      </div>
    </section>
  );
};
