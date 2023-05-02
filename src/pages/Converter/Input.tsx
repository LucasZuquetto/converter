import styled from "styled-components";
import { IInput } from "../../interfaces/inputProps";

export default function Input(props:IInput) {
   return (
      <InputContainer>
         <input
            type="number"
            value={props.amount}
            onChange={(e) => {
               props.setAmount(Number(e.target.value));
            }}
         />
         <select
            onChange={(e) => {
                props.setValueKey(e.target.value);
            }}
            value={props.valueKey}
         >
            {props.currenciesNames.map((c, index) => (
               <option value={c.key} key={index}>
                  {c.name}
               </option>
            ))}
         </select>
      </InputContainer>
   );
}

const InputContainer = styled.div`
   input {
      border: 1px solid #333;
      border-radius: 5px;
      padding: 10px;
      box-sizing: border-box;
   }
   select {
      margin-left: 5px;
   }
`;