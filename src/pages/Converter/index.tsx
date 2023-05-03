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
   Box,
   Container,
   VStack,
   Text,
   Stack,
} from "@chakra-ui/react";

enum defaultCurrencies {
   brl = "brl",
   usd = "usd"
}

export default function Converter() {
   // readaptar projeto para ter um botao
   // testes end to end
   // styling do projeto
   // tipar bem tudo
   // trocar axios por react query
   // fazer estatistica que nem o site
   const [currenciesNames, setCurrenciesNames] = useState<ICurrencies[]>([]);
   const [initialValueKey, setInitialValueKey] = useState<string>(defaultCurrencies.brl);
   const [finalValueKey, setFinalValueKey] = useState<string>(defaultCurrencies.usd);
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
            variant="outline"
            boxShadow="rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;"
            sx={{
               '@media screen and (max-width:530px)': {
                 width: '100vw',
               },
             }}
         >
            <CardHeader textAlign='center'>
               <Heading size="lg">Conversor de Moedas</Heading>
            </CardHeader>
            <CardBody>
               <VStack>
                  <Stack w="100%">
                     <Text align="left" fontSize="xl">
                        De
                     </Text>
                     <Input
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
                        setFinalValueKey(initialValueKey);
                        setInitialValueKey(finalValueKey);
                        setIsChanging(true);
                        setFinalAmount(initialAmount / exchangeRate);
                     }}
                  />
                  <Stack w="100%">
                     <Text align="left" fontSize="xl">
                        Para
                     </Text>
                     <Input
                        currenciesNames={currenciesNames}
                        valueKey={finalValueKey}
                        setValueKey={setFinalValueKey}
                        setAmount={setFinalAmount}
                        amount={finalAmount}
                     />
                  </Stack>

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
