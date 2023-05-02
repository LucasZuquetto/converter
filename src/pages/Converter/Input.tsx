import styled from "styled-components";

interface ICurrenciesProps {
   currencies: string[][];
}

export default function Input(props: ICurrenciesProps) {
   return (
      <InputStyle>
         <input type="number" />
         <SelectStyle>
            <select onChange={(e) => console.log(e.target.value)}>
               {props.currencies[0]
                  ? props.currencies[0].map((c, index) => (
                       <option  value={c} key={index} >
                          {props.currencies[1][index]}
                       </option>
                    ))
                  : ""}
            </select>
         </SelectStyle>
      </InputStyle>
   );
}

const InputStyle = styled.span`
   display: flex;
   input {
      border: 1px solid black;
   }
`;

const SelectStyle = styled.div`
   width: 100px;
   select {
      height: 35px;
   }
`;
