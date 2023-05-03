import { ICurrencies } from "./currenciesNames";

export interface IInput {
   amount: number;
   setAmount: any;
   setValueKey: any;
   valueKey: string;
   currenciesNames: ICurrencies[];
   isVisible: boolean
}
