import styled from "styled-components";
import Input from "./Input";
import { useEffect, useState } from "react";
import axiosApi from "../../services/axios";

export default function Converter() {
   const [currencies, setCurrencies] = useState<string[][]>([]);

   useEffect(() =>{
      axiosApi.get('/currencies.json').then(({data}) =>{
         const currenciesKeys: string[] = Object.keys(data)
         const currenciesValues: string[]= Object.values(data)
         setCurrencies([currenciesKeys, currenciesValues]);
      })
   },[])
   return (
      <>
         <Title>CONVERSOR DE MOEDAS</Title>
         <MainContainer>
            <div>
               <div>
                  <h3>Quantia</h3>
                  <Input currencies={currencies}/>
               </div>
               <div>
                  <h3>Converter para</h3>
                  <Input currencies={currencies}/>
               </div>
            </div>
         </MainContainer>
      </>
   );
}

const Title = styled.h1`
   font-size: 30px;
   color: white;
   font-weight: 700;
   text-align: center;
   margin-bottom: 15px;
`;

const MainContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: #f6fcfc;
   height: 40vh;
   width: 80vw;
   border-radius: 10px;
   box-shadow: 3px 2px #e4e4e461;
   h3 {
      color: black;
      font-weight: 500;
      margin-bottom: 8px;
      font-size: 16px;
   }
   div {
      display: flex;
      div {
         display: flex;
         flex-direction: column;
         margin: 0 20px;
      }
   }
   input {
      height: 30px;
      width: 20vw;
      background-color: white;
      border-radius: 5px;
   }
`;
