import {
   Button,
   Card,
   CardBody,
   CardHeader,
   Heading,
   IconButton,
   Stack,
   Text,
   VStack,
} from "@chakra-ui/react";
import Input from "./Input";
import { TbArrowsDownUp } from "react-icons/tb";
import { IMainCardProps } from "../../interfaces/mainCardProps";

export default function MainCard({
   setIsVisible,
   finalAmount,
   exchangeRate,
   setFinalAmount,
   finalValueKey,
   setIsChanging,
   setFinalValueKey,
   initialAmount,
   setInitialAmount,
   setInitialValueKey,
   initialValueKey,
   isVisible,
   currenciesNames,
}: IMainCardProps) {
   return (
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
                     setIsVisible(!isVisible);
                     setFinalAmount(
                        Number((initialAmount * exchangeRate).toFixed(2))
                     );
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
   );
}
