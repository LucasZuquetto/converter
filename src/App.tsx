import { BrowserRouter, Route, Routes } from "react-router-dom";
import Converter from "./pages/Converter";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
   const queryClient = new QueryClient()
   return (
      <>
         <BrowserRouter>
            <QueryClientProvider client={queryClient}>
               <ChakraProvider>
                  <Routes>
                     <Route path="/" element={<Converter />} />
                  </Routes>
               </ChakraProvider>
            </QueryClientProvider>
         </BrowserRouter>
      </>
   );
}

export default App;
