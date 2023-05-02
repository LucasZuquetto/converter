import { useEffect, useState } from "react";
import Input from "./Input";
import { ICurrencies } from "../../interfaces/currenciesNames";
import {
   getCurrenciesNames,
   getExchangeRate,
} from "../../services/getRequests";
import { TbArrowsExchange } from "react-icons/tb";

export default function Converter() {
   const [currenciesNames, setCurrenciesNames] = useState<ICurrencies[]>([]);
   const [initialValueKey, setInitialValueKey] = useState<string>("brl");
   const [finalValueKey, setFinalValueKey] = useState<string>("usd");
   const [initialAmount, setInitialAmount] = useState<number>(0);
   const [finalAmount, setFinalAmount] = useState<number>(0);
   const [exchangeRate, setExchangeRate] = useState<number>(5);
   const [isChanging, setIsChanging] = useState<boolean>(false)

   useEffect(() => {
      getCurrenciesNames().then(({ data }) => {
         const currenciesKeys: string[] = Object.keys(data);
         const currenciesValues: string[] = Object.values(data);
         const blabla = currenciesKeys.map((c, index) => {
            return {
               key: currenciesKeys[index],
               name: currenciesValues[index],
            };
         });

         setCurrenciesNames(blabla);
      });
   }, []);

   useEffect(() => {
      setFinalAmount(initialAmount * exchangeRate);
   }, [initialAmount]);

   useEffect(() => {
      if(isChanging === true){
         setIsChanging(false)
         return
      }
      setInitialAmount(finalAmount / exchangeRate);
   }, [finalAmount]);

   useEffect(() => {
      getExchangeRate(initialValueKey, finalValueKey).then(({ data }) => {
         setExchangeRate(data[finalValueKey]);
      });
   }, [initialValueKey, finalValueKey]);

   return (
      <>
         <h1>Converter</h1>
         <div>
            <Input
               currenciesNames={currenciesNames}
               valueKey={initialValueKey}
               setValueKey={setInitialValueKey}
               setAmount={setInitialAmount}
               amount={initialAmount}
            />
            <TbArrowsExchange
               style={{ fontSize: "40px" }}
               onClick={() => {
                  setFinalValueKey(initialValueKey);
                  setInitialValueKey(finalValueKey);
                  setIsChanging(true)
                  setFinalAmount(initialAmount / exchangeRate)
               }}
            />
            <Input
               currenciesNames={currenciesNames}
               valueKey={finalValueKey}
               setValueKey={setFinalValueKey}
               setAmount={setFinalAmount}
               amount={finalAmount}
            />
         </div>
      </>
   );
}
