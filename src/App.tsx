import { BrowserRouter, Route, Routes } from "react-router-dom";
import Converter from "./pages/Converter";
import GlobalStyle from "./assets/styles/GlobalStyles";

function App() {
   return (
      <>
         <GlobalStyle />
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<Converter />} />
            </Routes>
         </BrowserRouter>
      </>
   );
}

export default App;
