import { Card, CardBody, Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import { IResultsCardProps } from "../../interfaces/resultsCardsProps";

export default function ResultsCard (props:IResultsCardProps) {
    return (
        <Card
               transition={`opacity .1s ease-${props.transitionType}`}
               opacity={props.opacity}
               marginTop="15px"
               w="100%"
               variant="outline"
               boxShadow="rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;"
               sx={{
                  "@media screen and (max-width:530px)": {
                     width: "100vw",
                  },
               }}
            >
               <CardBody>
                  <Stat>
                     <StatLabel
                        color="gray"
                        fontSize="17px"
                        fontWeight="600"
                     >{`${props.initialAmount} ${props.initialValueKey.toUpperCase()} = `}</StatLabel>
                     <StatNumber fontSize="30px">{`${props.finalAmount} ${props.finalValueKey.toUpperCase()}`}</StatNumber>
                     <StatHelpText>{`1 ${props.initialValueKey.toUpperCase()} = ${
                        1 * props.exchangeRate
                     } ${props.finalValueKey.toUpperCase()}`}</StatHelpText>
                     <StatHelpText>{`1 ${props.finalValueKey.toUpperCase()} = ${
                        1 / props.exchangeRate
                     } ${props.initialValueKey.toUpperCase()}`}</StatHelpText>
                  </Stat>
               </CardBody>
            </Card>
    )
}