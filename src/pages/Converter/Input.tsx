import styled from "styled-components";
import { IInput } from "../../interfaces/inputProps";
import {
   NumberDecrementStepper,
   NumberIncrementStepper,
   NumberInput,
   NumberInputField,
   NumberInputStepper,
   Select,
} from "@chakra-ui/react";

export default function Input(props: IInput) {
   const format = (val: any) => `$ ` + val;
   const parse = (val: any) => val.replace(/^\$/, "");
   return (
      <>
         <NumberInput
            onChange={(valueString) => props.setAmount(parse(valueString))}
            value={format(props.amount)}
            w='100%'
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
      </>
   );
}

// const InputContainer = styled.div`
//    input {
//       border: 1px solid #333;
//       border-radius: 5px;
//       padding: 10px;
//       box-sizing: border-box;
//    }
//    select {
//       margin-left: 5px;
//    }
// `;
