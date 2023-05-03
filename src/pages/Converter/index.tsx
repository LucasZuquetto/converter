import { useEffect, useRef, useState } from "react";
import Input from "./Input";
import { ICurrencies } from "../../interfaces/currenciesNames";
import {
   getCurrenciesNames,
   getExchangeRate,
} from "../../services/getRequests";
import { TbArrowsExchange } from "react-icons/tb";
import {
   Button,
   IconButton,
   Card,
   CardHeader,
   CardBody,
   Heading,
   Box,
   Container,
   VStack,
} from "@chakra-ui/react";

export default function Converter() {
   // readaptar projeto para ter um botao
   // testes end to end
   // styling do projeto
   // tipar bem tudo
   // criar enum para o brl e pro usd
   // trocar axios por react query
   // fazer estatistica que nem o site
   const [currenciesNames, setCurrenciesNames] = useState<ICurrencies[]>([]);
   const [initialValueKey, setInitialValueKey] = useState<string>("brl");
   const [finalValueKey, setFinalValueKey] = useState<string>("usd");
   const [initialAmount, setInitialAmount] = useState<number>(0);
   const [finalAmount, setFinalAmount] = useState<number>(0);
   const [exchangeRate, setExchangeRate] = useState<number>(5);
   const [isChanging, setIsChanging] = useState<boolean>(false);

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
      if (isChanging === true) {
         setIsChanging(false);
         return;
      }
      setInitialAmount(finalAmount / exchangeRate);
   }, [finalAmount]);

   useEffect(() => {
      getExchangeRate(initialValueKey, finalValueKey).then(({ data }) => {
         setExchangeRate(data[finalValueKey]);
      });
   }, [initialValueKey, finalValueKey]);

   return (
      <Container centerContent justifyContent="center" h="100vh">
         <Card
            w="100%"
            h="400px"
            variant="outline"
            boxShadow="rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;"
         >
            <CardHeader>
               <Heading size="lg">Conversor de Moedas</Heading>
            </CardHeader>
            <CardBody>
               <VStack>
                  <Input
                     currenciesNames={currenciesNames}
                     valueKey={initialValueKey}
                     setValueKey={setInitialValueKey}
                     setAmount={setInitialAmount}
                     amount={initialAmount}
                  />
                  <IconButton
                     colorScheme="red"
                     aria-label="Call Segun"
                     size="lg"
                     icon={<TbArrowsExchange style={{ fontSize: "30px" }} />}
                     onClick={() => {
                        setFinalValueKey(initialValueKey);
                        setInitialValueKey(finalValueKey);
                        setIsChanging(true);
                        setFinalAmount(initialAmount / exchangeRate);
                     }}
                  />
                  <Input
                     currenciesNames={currenciesNames}
                     valueKey={finalValueKey}
                     setValueKey={setFinalValueKey}
                     setAmount={setFinalAmount}
                     amount={finalAmount}
                  />
                  <Button
                     onClick={() => console.log("click")}
                     colorScheme="red"
                     variant="solid"
                  >
                     Converter
                  </Button>
               </VStack>
            </CardBody>
         </Card>
      </Container>
   );
}
