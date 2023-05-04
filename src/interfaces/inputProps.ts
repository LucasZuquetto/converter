import { ICurrencies } from "./currenciesNames";

export interface IInput {
   amount: number;
   setAmount: any;
   setValueKey: any;
   valueKey: string;
   currenciesNames: ICurrencies[] | undefined;
   isVisible: boolean
}
