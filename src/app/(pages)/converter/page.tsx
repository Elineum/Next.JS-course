import { ConvertHistory } from "@/app/components/ConvertHistory";
import { Converter } from "@/app/components/Converter";
import React from "react";

export default function ConverterPage() {
  return (
    <main>
      <Converter />
      <ConvertHistory />
    </main>
  );
}
