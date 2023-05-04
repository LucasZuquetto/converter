import { ICurrencies } from "./currenciesNames";

export interface IMainCardProps {
    isVisible: boolean;
    currenciesNames: ICurrencies[] | undefined;
    initialValueKey: string;
    setInitialValueKey: any;
    setIsVisible:any;
    finalAmount:number;
    exchangeRate:number | undefined;
    setFinalAmount:any;
    finalValueKey:string;
    setIsChanging:any;
    setFinalValueKey:any;
    initialAmount:number;
    setInitialAmount:any;
 }