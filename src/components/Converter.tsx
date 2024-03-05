"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Button } from "./Button";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { ISelectOptions } from "../model/currencyOption.interface";
import { useConverterStore } from "@/store/application.store";

interface IConverterProps {
  currencyData: string | ISelectOptions[];
}

const dateWeekAgo = new Date().setDate(new Date().getDate() - 7);
const firstAvailableDate = new Date("1990-01-01");

export const Converter = ({ currencyData }: IConverterProps) => {
  const [currencyList, setCurrencyList] = useState<ISelectOptions[]>(
    typeof currencyData !== "string" ? currencyData : ([] as ISelectOptions[])
  );
  const {
    changeIGetField,
    changeIGetSelect,
    changeIHaveField,
    changeIHaveSelect,
    saveChange,
    iGetAmount,
    iGetSelect,
    iHaveAmount,
    iHaveSelect,
  } = useConverterStore();
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("DD.MM.YYYY")
  );

  const updateDate = (date: Dayjs | null) => {
    if (date !== null) {
      const { $y, $M, $D } = date;

      setSelectedDate(date.format("DD.MM.YYYY"));

      fetch(
        `${process.env.NEXT_PUBLIC_API_LINK}/${
          process.env.NEXT_PUBLIC_API_KEY
        }/history/USD/${$y}/${$M + 1}/${$D}`
      )
        .then((res) => res.json())
        .then((json) => {
          const currencyList: ISelectOptions[] = Object.entries(
            json.conversion_rates
          ).map(([key, value]) => {
            return { value, label: key } as ISelectOptions;
          });

          setCurrencyList(currencyList);
        });
    }
  };

  useEffect(() => {
    changeIHaveSelect(
      currencyList.find((item) => item.label === "USD") || currencyList[0]
    );
    changeIGetSelect(
      currencyList.find((item) => item.label === "EUR") || currencyList[0]
    );
    changeIGetField("0");
    changeIHaveField("0");
  }, [currencyList]);

  return (
    <section className="bg-white px-[15px] py-20 leading-none">
      <div className="container-medium bg-[#ffffff] py-[55px] pl-12 pr-[60px]">
        <h2 className="font-bold text-[40px] text-black mb-[70px]">
          Конвертер валют
        </h2>
        {typeof currencyData !== "string" ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="mb-[30px]">В мене є:</p>
                <div className="flex gap-x-[15px]">
                  <input
                    type="number"
                    min={0}
                    value={iHaveAmount}
                    className="py-4 px-2 h-[60px] w-[220px] border border-[#C1C2CA] rounded text-center"
                    onChange={(e) => changeIHaveField(e.target.value)}
                  />
                  <Select
                    instanceId={"iHaveSelect"}
                    options={currencyList}
                    value={iHaveSelect}
                    className="min-w-[120px]"
                    classNames={{ control: () => "h-[60px]" }}
                    onChange={(newValue) =>
                      changeIHaveSelect(newValue as ISelectOptions)
                    }
                  />
                </div>
              </div>
              <Image
                src={"/convert-arrow.png"}
                alt="arrows"
                width={22}
                height={22}
                className="py-4 self-end"
              />
              <div>
                <p className="mb-[30px]">Хочу придбати:</p>
                <div className="flex gap-x-[15px]">
                  <input
                    min={0}
                    type="number"
                    value={iGetAmount}
                    className="py-4 px-2 h-[60px] w-[220px] border border-[#C1C2CA] rounded text-center"
                    onChange={(e) => changeIGetField(e.target.value)}
                  />
                  <Select
                    options={currencyList}
                    value={iGetSelect}
                    instanceId={"iGetSelect"}
                    className="min-w-[120px]"
                    classNames={{ control: () => "h-[60px]" }}
                    onChange={(newValue) =>
                      changeIGetSelect(newValue as ISelectOptions)
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  defaultValue={dayjs(dateWeekAgo)}
                  minDate={dayjs(firstAvailableDate)}
                  maxDate={dayjs(dateWeekAgo)}
                  className="w-[220px]"
                  onChange={updateDate}
                />
              </LocalizationProvider>
              <Button
                className="text-[#F6F7FF]"
                onClick={() => saveChange(selectedDate)}
              >
                Зберегти результат
              </Button>
            </div>
          </>
        ) : (
          <p>{currencyData}</p>
        )}
      </div>
    </section>
  );
};
