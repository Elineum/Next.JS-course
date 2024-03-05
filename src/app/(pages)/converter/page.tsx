"use server";
import { ConvertHistory } from "@/components/ConvertHistory";
import { Converter } from "@/components/Converter";
import { ISelectOptions } from "@/model/currencyOption.interface";
import React from "react";

export default async function ConverterPage() {
  const fetchCurrData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_LINK}/${process.env.NEXT_PUBLIC_API_KEY}/latest/USD`,
        { next: { revalidate: 6000 } }
      );

      if (!res.ok) throw new Error("Can't fetch data");

      const json = await res.json();
      const ratesList = Object.entries(json.conversion_rates).map(
        ([key, value]) => {
          return { value, label: key };
        }
      );

      return ratesList as ISelectOptions[];
    } catch (err: unknown) {
      return (err as Error).message;
    }
  };

  return (
    <main>
      <Converter currencyData={await fetchCurrData()} />
      <ConvertHistory />
    </main>
  );
}
