import { useEffect, useState } from "react";
import { ICurrencies } from "../../interfaces/currenciesNames";
import {
   getCurrenciesNames,
   getExchangeRate,
} from "../../services/currenciesRequests";
import { Container } from "@chakra-ui/react";
import ResultsCard from "./ResultsCard";
import MainCard from "./MainCard";

enum defaultCurrencies {
   brl = "brl",
   usd = "usd",
}

export default function Converter() {
   const [currenciesNames, setCurrenciesNames] = useState<ICurrencies[]>([]);
   const [initialValueKey, setInitialValueKey] = useState<string>(
      defaultCurrencies.brl
   );
   const [finalValueKey, setFinalValueKey] = useState<string>(
      defaultCurrencies.usd
   );
   const [initialAmount, setInitialAmount] = useState<number>(0);
   const [finalAmount, setFinalAmount] = useState<number>(0);
   const [exchangeRate, setExchangeRate] = useState<number>(5);
   const [isChanging, setIsChanging] = useState<boolean>(false);
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      getCurrenciesNames().then(({ data }) => {
         const currenciesKeys: string[] = Object.keys(data);
         const currenciesValues: string[] = Object.values(data);
         const formatCurrenciesNames = currenciesKeys.map((c, index) => {
            return {
               key: currenciesKeys[index],
               name: currenciesValues[index],
            };
         });

         setCurrenciesNames(formatCurrenciesNames);
         setIsChanging(false);
      });
   }, []);

   useEffect(() => {
      if (isChanging === true) {
         setIsChanging(false);
         return;
      }
      setFinalAmount(Number((initialAmount * exchangeRate).toFixed(2)));
      setIsChanging(true);
   }, [initialAmount]);

   useEffect(() => {
      if (isChanging === true) {
         setIsChanging(false);
         return;
      }
      setInitialAmount(Number((finalAmount / exchangeRate).toFixed(2)));
      setIsChanging(true);
   }, [finalAmount]);

   useEffect(() => {
      getExchangeRate(initialValueKey, finalValueKey).then(({ data }) => {
         setExchangeRate(data[finalValueKey]);
         setFinalAmount(0);
      });
   }, [initialValueKey, finalValueKey]);

   return (
      <Container centerContent justifyContent="center" h="100vh">
         <MainCard
            setInitialAmount={setInitialAmount}
            initialAmount={initialAmount}
            setFinalValueKey={setFinalValueKey}
            setIsChanging={setIsChanging}
            finalValueKey={finalValueKey}
            setFinalAmount={setFinalAmount}
            exchangeRate={exchangeRate}
            finalAmount={finalAmount}
            setIsVisible={setIsVisible}
            setInitialValueKey={setInitialValueKey}
            initialValueKey={initialValueKey}
            currenciesNames={currenciesNames}
            isVisible={isVisible}
         />
         {!isVisible ? (
            <ResultsCard
               transitionType={"out"}
               opacity={"0"}
               finalValueKey={finalValueKey}
               exchangeRate={exchangeRate}
               finalAmount={finalAmount}
               initialValueKey={initialValueKey}
               initialAmount={initialAmount}
            />
         ) : (
            <ResultsCard
               transitionType={"in"}
               opacity={"1"}
               finalValueKey={finalValueKey}
               exchangeRate={exchangeRate}
               finalAmount={finalAmount}
               initialValueKey={initialValueKey}
               initialAmount={initialAmount}
            />
         )}
      </Container>
   );
}
