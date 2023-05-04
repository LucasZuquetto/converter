import { useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";
import ResultsCard from "./ResultsCard";
import MainCard from "./MainCard";
import useGetCurrenciesNames from "../../hooks/useGetCurrenciesNames";
import useGetExchangeRates from "../../hooks/useGetExchangeRates";

enum defaultCurrencies {
   brl = "brl",
   usd = "usd",
}

export default function Converter() {
   const [initialValueKey, setInitialValueKey] = useState<string>(
      defaultCurrencies.brl
   );
   const [finalValueKey, setFinalValueKey] = useState<string>(
      defaultCurrencies.usd
   );
   const [initialAmount, setInitialAmount] = useState<number>(0);
   const [finalAmount, setFinalAmount] = useState<number>(0);
   const [isChanging, setIsChanging] = useState<boolean>(false);
   const [isVisible, setIsVisible] = useState(false);

   const { data: currenciesNames } = useGetCurrenciesNames(setIsChanging);
   const { data: exchangeRate, refetch: refetchExchangeRate } =
      useGetExchangeRates(initialValueKey, finalValueKey);

   useEffect(() => {
      if (isChanging === true) {
         setIsChanging(false);
         return;
      }
      if (exchangeRate) {
         setFinalAmount(Number((initialAmount * exchangeRate).toFixed(2)));
      }
      setIsChanging(true);
   }, [initialAmount]);

   useEffect(() => {
      if (isChanging === true) {
         setIsChanging(false);
         return;
      }
      if (exchangeRate) {
         setInitialAmount(Number((finalAmount / exchangeRate).toFixed(2)));
      }
      setIsChanging(true);
   }, [finalAmount]);

   useEffect(() => {
      refetchExchangeRate().then(() => setFinalAmount(0));
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
