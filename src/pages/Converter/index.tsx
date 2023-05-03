import { useEffect, useState } from "react";
import Input from "./Input";
import { ICurrencies } from "../../interfaces/currenciesNames";
import {
   getCurrenciesNames,
   getExchangeRate,
} from "../../services/currenciesRequests";
import { TbArrowsDownUp } from "react-icons/tb";
import {
   Button,
   IconButton,
   Card,
   CardHeader,
   CardBody,
   Heading,
   Container,
   VStack,
   Text,
   Stack,
} from "@chakra-ui/react";
import ResultsCard from "./ResultsCard";

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
         setFinalAmount(Number((initialAmount / exchangeRate).toFixed(2)));
      });
   }, [initialValueKey, finalValueKey]);

   return (
      <Container centerContent justifyContent="center" h="100vh">
         <Card
            w="100%"
            variant="outline"
            boxShadow="rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;"
            sx={{
               "@media screen and (max-width:530px)": {
                  width: "100vw",
               },
            }}
         >
            <CardHeader textAlign="center">
               <Heading size="lg">Conversor de Moedas</Heading>
            </CardHeader>
            <CardBody>
               <VStack>
                  <Stack w="100%">
                     <Text align="left" fontSize="xl">
                        De
                     </Text>
                     <Input
                        isVisible={isVisible}
                        currenciesNames={currenciesNames}
                        valueKey={initialValueKey}
                        setValueKey={setInitialValueKey}
                        setAmount={setInitialAmount}
                        amount={initialAmount}
                     />
                  </Stack>

                  <IconButton
                     colorScheme="red"
                     aria-label="Call Segun"
                     size="lg"
                     icon={<TbArrowsDownUp style={{ fontSize: "25px" }} />}
                     onClick={() => {
                        if (isVisible) {
                           return;
                        }
                        setInitialValueKey(finalValueKey);
                        setFinalValueKey(initialValueKey);
                        setIsChanging(false);
                     }}
                  />
                  <Stack w="100%">
                     <Text align="left" fontSize="xl">
                        Para
                     </Text>
                     <Input
                        isVisible={isVisible}
                        currenciesNames={currenciesNames}
                        valueKey={finalValueKey}
                        setValueKey={setFinalValueKey}
                        setAmount={setFinalAmount}
                        amount={finalAmount}
                     />
                  </Stack>

                  <Button
                     onClick={() => {
                        setIsVisible(!isVisible)
                        setFinalAmount(Number((initialAmount * exchangeRate).toFixed(2)));
                     }}
                     colorScheme="red"
                     variant="solid"
                  >
                     {isVisible
                        ? "Realizar nova conversão"
                        : "Detalhes da Conversão"}
                  </Button>
               </VStack>
            </CardBody>
         </Card>
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
