import { BrowserRouter, Route, Routes } from "react-router-dom";
import Converter from "./pages/Converter";
// import GlobalStyle from "./assets/styles/GlobalStyles";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
   return (
      <>
         {/* <GlobalStyle /> */}
         <BrowserRouter>
            <ChakraProvider>
               <Routes>
                  <Route path="/" element={<Converter />} />
               </Routes>
            </ChakraProvider>
         </BrowserRouter>
      </>
   );
}

export default App;
