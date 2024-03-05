import { ISelectOptions } from "./currencyOption.interface";

export interface IChangeHistory {
  date: string;
  iHaveAmount: number;
  iHaveSelect: ISelectOptions;
  iGetAmount: number;
  iGetSelect: ISelectOptions;
}
