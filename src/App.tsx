import { BrowserRouter, Route, Routes } from "react-router-dom";
import Converter from "./pages/Converter";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
   return (
      <>
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
