"use client";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Select, { SingleValue, ActionMeta } from "react-select";
import { Button } from "./Button";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import getConvertiongValue from "@/utils/getConvertingValue";
import { ISelectOptions } from "../model/currencyList.interface";

interface IConvertData {
  iHaveInput: number;
  iHaveSelect: ISelectOptions;
  iGetInput: number;
  iGetSelect: ISelectOptions;
  lastChange: "first" | "second";
}

interface IConverterProps {
  currencyData: string | ISelectOptions[];
}

const dateWeekAgo = new Date().setDate(new Date().getDate() - 7);
const firstAvailableDate = new Date("1990-01-01");
const initialOption: SingleValue<ISelectOptions> = {
  value: 1,
  label: "",
};

export const Converter = ({ currencyData }: IConverterProps) => {
  const [currencyList, setCurrencyList] = useState<ISelectOptions[]>(
    typeof currencyData !== "string" ? currencyData : ([] as ISelectOptions[])
  );
  const [converterData, setConverterData] = useState<IConvertData>({
    iHaveInput: 0,
    iHaveSelect:
      currencyList.find((item) => item.label === "USD") || initialOption,
    iGetInput: 0,
    iGetSelect:
      currencyList.find((item) => item.label === "EUR") || initialOption,
    lastChange: "first",
  });

  const updateDate = (date: Dayjs | null) => {
    if (date !== null) {
      const { $y, $M, $D } = date;

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
        })
        .then(() => {
          changeDataHandler("date");
        });
    }
  };

  const changeDataHandler = (
    changerType: "input" | "select" | "date",
    data?:
      | ChangeEvent<HTMLInputElement>
      | { selectValue: SingleValue<ISelectOptions>; selectName: string }
  ) => {
    const getSelectValue = converterData.iGetSelect.value;
    const haveSelectValue = converterData.iHaveSelect.value;
    const { iGetInput, iHaveInput, lastChange } = converterData;

    if (changerType === "input") {
      const input = data as ChangeEvent<HTMLInputElement>;
      const inputValue = Number(input.target.value);
      const inputName = input.target.name;

      if (inputName === "have-money-input") {
        setConverterData({
          ...converterData,
          iHaveInput: inputValue,
          iGetInput: getConvertiongValue(
            inputValue,
            haveSelectValue,
            getSelectValue
          ),
          lastChange: "first",
        });
      } else {
        setConverterData({
          ...converterData,
          iGetInput: inputValue,
          iHaveInput: getConvertiongValue(
            inputValue,
            getSelectValue,
            haveSelectValue
          ),
          lastChange: "second",
        });
      }
    } else if (changerType === "select") {
      const { selectName, selectValue } = data as {
        selectValue: ISelectOptions;
        selectName: string;
      };

      if (selectName === "have-money-select") {
        if (lastChange === "first") {
          setConverterData({
            ...converterData,
            iHaveSelect: selectValue,
            iGetInput: getConvertiongValue(
              iHaveInput,
              haveSelectValue,
              getSelectValue
            ),
          });
        } else {
          setConverterData({
            ...converterData,
            iHaveSelect: selectValue,
            iHaveInput: getConvertiongValue(
              iGetInput,
              getSelectValue,
              haveSelectValue
            ),
          });
        }
      } else {
        if (lastChange === "first") {
          setConverterData({
            ...converterData,
            iGetSelect: selectValue,
            iGetInput: getConvertiongValue(
              iHaveInput,
              haveSelectValue,
              getSelectValue
            ),
          });
        } else {
          setConverterData({
            ...converterData,
            iGetSelect: selectValue,
            iHaveInput: getConvertiongValue(
              iGetInput,
              getSelectValue,
              haveSelectValue
            ),
          });
        }
      }
    } else {
      setConverterData({
        ...converterData,
        iHaveInput: 0,
        iGetInput: 0,
        iHaveSelect:
          currencyList.find((item) => item.label === "USD") || initialOption,
        iGetSelect:
          currencyList.find((item) => item.label === "EUR") || initialOption,
      });
    }
  };

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
                    name="have-money-input"
                    value={converterData.iHaveInput}
                    className="py-4 px-2 h-[60px] w-[220px] border border-[#C1C2CA] rounded text-center"
                    onChange={(e) => changeDataHandler("input", e)}
                  />
                  <Select
                    instanceId={"iHaveSelect"}
                    options={currencyList}
                    value={converterData.iHaveSelect}
                    className="min-w-[120px]"
                    classNames={{ control: () => "h-[60px]" }}
                    name="have-money-select"
                    placeholder=""
                    onChange={(value, action) =>
                      changeDataHandler("select", {
                        selectValue: value,
                        selectName: action.name ?? "",
                      })
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
                    name="get-money-input"
                    value={converterData.iGetInput}
                    className="py-4 px-2 h-[60px] w-[220px] border border-[#C1C2CA] rounded text-center"
                    onChange={(e) => changeDataHandler("input", e)}
                  />
                  <Select
                    options={currencyList}
                    value={converterData.iGetSelect}
                    instanceId={"iGetSelect"}
                    className="min-w-[120px]"
                    classNames={{ control: () => "h-[60px]" }}
                    name="get-money-select"
                    placeholder=""
                    onChange={(value, action) =>
                      changeDataHandler("select", {
                        selectValue: value,
                        selectName: action.name ?? "",
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <LocalizationProvider
                key={"localization-provider"}
                dateAdapter={AdapterDayjs}
              >
                <DatePicker
                  defaultValue={dayjs(dateWeekAgo)}
                  minDate={dayjs(firstAvailableDate)}
                  maxDate={dayjs(dateWeekAgo)}
                  className="w-[220px]"
                  onChange={updateDate}
                />
              </LocalizationProvider>
              <Button>Зберегти результат</Button>
            </div>
          </>
        ) : (
          <p>{currencyData}</p>
        )}
      </div>
    </section>
  );
};
