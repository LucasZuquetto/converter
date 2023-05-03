import { IInput } from "../../interfaces/inputProps";
import {
   InputGroup,
   InputLeftAddon,
   NumberDecrementStepper,
   NumberIncrementStepper,
   NumberInput,
   NumberInputField,
   NumberInputStepper,
   Select,
} from "@chakra-ui/react";

export default function Input(props: IInput) {
   const parse = (val: any) => val.replace(/^\$/, "");
   return (
      <>
         <Select
            onChange={(e) => {
               props.setValueKey(e.target.value);
            }}
            value={props.valueKey}
            variant="outline"
            placeholder="Outline"
         >
            {props.currenciesNames.map((c, index) => (
               <option value={c.key} key={index}>
                  {c.name}
               </option>
            ))}
         </Select>
         <InputGroup>
            <InputLeftAddon children={`${props.valueKey.toUpperCase()}`} />
            <NumberInput
               onChange={(valueString) => props.setAmount(parse(valueString))}
               value={props.amount}
               w="100%"
            >
               <NumberInputField />
               <NumberInputStepper>
                  <NumberIncrementStepper
                     bg="green.200"
                     _active={{ bg: "green.300" }}
                     children="+"
                  />
                  <NumberDecrementStepper
                     bg="pink.200"
                     _active={{ bg: "pink.300" }}
                     children="-"
                  />
               </NumberInputStepper>
            </NumberInput>
         </InputGroup>
      </>
   );
}
