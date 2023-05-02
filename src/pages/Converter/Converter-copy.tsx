import styled from "styled-components";
import { useEffect, useState } from "react";
import axiosApi from "../../services/axios";

interface ICurrencies {
   key: string;
   name: string;
}

export default function Converter() {
   const [currenciesNames, setCurrenciesNames] = useState<ICurrencies[]>([]);
   const [initialValueKey, setInitialValueKey] = useState<string>("brl");
   const [finalValueKey, setFinalValueKey] = useState<string>("usd");
   const [initialAmount, setInitialAmount] = useState<number>(0);
   const [finalAmount, setFinalAmount] = useState<number>(0);
   const [exchangeRate, setExchangeRate] = useState<number>(5);

   useEffect(() => {
      axiosApi.get("/currencies.json").then(({ data }) => {
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
      setFinalAmount(initialAmount / exchangeRate);
   }, [initialAmount]);
   
   useEffect(() => {
      setInitialAmount(finalAmount * exchangeRate);
   }, [finalAmount]);

   useEffect(() => {
      axiosApi
         .get(`/currencies/${initialValueKey}/${finalValueKey}.json`)
         .then(({ data }) => setExchangeRate(data[finalValueKey]));
   }, [initialValueKey, finalValueKey]);

   return (
      <>
         <h1>Converter</h1>
         <div>
            <InputContainer>
               <input
                  type="number"
                  value={initialAmount}
                  onChange={(e) => {
                     setInitialAmount(Number(e.target.value));
                  }}
               />
               <select
                  onChange={(e) => {
                     setInitialValueKey(e.target.value);
                  }}
                  value={initialValueKey}
               >
                  {currenciesNames.map((c, index) => (
                     <option value={c.key} key={index}>
                        {c.name}
                     </option>
                  ))}
               </select>
            </InputContainer>
            <InputContainer>
               <input
                  type="number"
                  value={finalAmount}
                  onChange={(e) => {
                     setFinalAmount(Number(e.target.value));
                  }}
               />
               <select
                  onChange={(e) => {
                     setFinalValueKey(e.target.value);
                  }}
                  value={finalValueKey}
               >
                  {currenciesNames.map((c, index) => (
                     <option value={c.key} key={index}>
                        {c.name}
                     </option>
                  ))}
               </select>
            </InputContainer>
         </div>
      </>
   );
}

const InputContainer = styled.div`
   input {
      border: 1px solid #333;
      border-radius: 5px;
      padding: 10px;
      box-sizing: border-box;
   }
   select {
      margin-left: 5px;
   }
`;
