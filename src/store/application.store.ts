import { IChangeHistory } from "@/model/changeHistory.interface";
import { ISelectOptions } from "@/model/currencyOption.interface";
import getCalculatedRate from "@/utils/getCalculatedRate";
import getSlicedNum from "@/utils/getSlicedNum";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type State = {
  iHaveAmount: number;
  iGetAmount: number;
  iHaveSelect: ISelectOptions;
  iGetSelect: ISelectOptions;
  lastFieldChanged: "iHave" | "iGet";
  changesHistory: IChangeHistory[];

  changeIHaveField: (newValue: string) => void;
  changeIGetField: (newValue: string) => void;
  changeIHaveSelect: (newValue: ISelectOptions) => void;
  changeIGetSelect: (newValue: ISelectOptions) => void;
  saveChange: (date: string) => void;
  clearHistory: () => void;
};

export const useConverterStore = create<State>()(
  devtools(
    persist(
      (set) => ({
        iHaveAmount: 0,
        iGetAmount: 0,
        iHaveSelect: { label: "", value: 1 },
        iGetSelect: { label: "", value: 1 },
        lastFieldChanged: "iHave",
        changesHistory: [],

        changeIHaveField: (newValue: string) =>
          set(({ iGetSelect, iHaveSelect }) => ({
            iHaveAmount: getSlicedNum(+newValue),
            iGetAmount: getCalculatedRate(
              +newValue,
              iGetSelect.value,
              iHaveSelect.value
            ),
            lastFieldChanged: "iHave",
          })),
        changeIGetField: (newValue: string) =>
          set(({ iGetSelect, iHaveSelect }) => ({
            iGetAmount: getSlicedNum(+newValue),
            iHaveAmount: getCalculatedRate(
              +newValue,
              iHaveSelect.value,
              iGetSelect.value
            ),
            lastFieldChanged: "iGet",
          })),
        changeIHaveSelect: (newValue: ISelectOptions) =>
          set(
            ({
              iHaveAmount,
              iGetAmount,
              lastFieldChanged,
              iGetSelect,
              iHaveSelect,
            }) => ({
              iHaveSelect: newValue ? newValue : iHaveSelect,
              iHaveAmount:
                lastFieldChanged === "iHave"
                  ? iHaveAmount
                  : getCalculatedRate(
                      iGetAmount,
                      newValue.value,
                      iGetSelect.value
                    ),
              iGetAmount:
                lastFieldChanged === "iHave"
                  ? getCalculatedRate(
                      iHaveAmount,
                      iGetSelect.value,
                      newValue.value
                    )
                  : iGetAmount,
            })
          ),
        changeIGetSelect: (newValue: ISelectOptions) =>
          set(
            ({
              iHaveAmount,
              iGetAmount,
              lastFieldChanged,
              iGetSelect,
              iHaveSelect,
            }) => ({
              iGetSelect: newValue ? newValue : iGetSelect,
              iGetAmount:
                lastFieldChanged === "iGet"
                  ? iGetAmount
                  : getCalculatedRate(
                      iHaveAmount,
                      newValue.value,
                      iHaveSelect.value
                    ),
              iHaveAmount:
                lastFieldChanged === "iGet"
                  ? getCalculatedRate(
                      iGetAmount,
                      iHaveSelect.value,
                      newValue.value
                    )
                  : iHaveAmount,
            })
          ),
        saveChange: (date) =>
          set(
            ({
              iGetAmount,
              iHaveAmount,
              changesHistory,
              iHaveSelect,
              iGetSelect,
            }) => {
              return iGetAmount === 0 || iHaveAmount === 0
                ? { changesHistory: [...changesHistory] }
                : {
                    changesHistory: [
                      ...changesHistory,
                      {
                        date: date,
                        iHaveAmount,
                        iHaveSelect,
                        iGetAmount,
                        iGetSelect,
                      },
                    ],
                  };
            }
          ),
        clearHistory: () =>
          set(() => ({
            changesHistory: [],
          })),
      }),
      {
        name: "cheap-change-storage",
        storage: createJSONStorage(() => localStorage),
        partialize(state) {
          const { changesHistory } = state;
          return { changesHistory };
        },
      }
    )
  )
);
