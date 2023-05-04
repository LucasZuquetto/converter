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
   return (
      <>
         <Select
            disabled={props.isVisible}
            onChange={(e) => {
               props.setValueKey(e.target.value);
            }}
            value={props.valueKey}
            variant="outline"
         >
            {props.currenciesNames?.map((c, index) => (
               <option value={c.key} key={index}>
                  {c.name}
               </option>
            ))}
         </Select>
         <InputGroup>
            <InputLeftAddon children={`${props.valueKey.toUpperCase()}`} />
            <NumberInput
               onChange={(valueString) => {
                  props.setAmount(Number(valueString));
               }}
               value={props.amount}
               w="100%"
            >
               <NumberInputField maxLength={25} disabled={props.isVisible} />
               <NumberInputStepper>
                  <NumberIncrementStepper
                     visibility={props.isVisible ? "hidden" : "inherit"}
                     bg="green.200"
                     _active={{ bg: "green.300" }}
                     children="+"
                  />
                  <NumberDecrementStepper
                     visibility={props.isVisible ? "hidden" : "inherit"}
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
