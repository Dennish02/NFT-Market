import LandingPage from "./pages/LandingPage.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ConfirmarCuenta from "./pages/ConfirmarCuenta.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

import OlvidePassword from "./pages/OlvidePassword.jsx";

import CrearNFT from "./pages/CrearNFT.jsx";
import Portfolio from "./pages/Portfolio.jsx";


function App() {
  return (
    <Router>
      <Routes>

        <Route  path='/' element={<LandingPage/>}/> 
        <Route path='/home' element={<Home/>}/>
        <Route path='/olvide-password/' element={<OlvidePassword/>}/> 
        <Route path='/olvide-password/:token' element={<ResetPassword/>}/>  
        <Route path="/confirmar/:id" element={<ConfirmarCuenta />} />
        <Route path="/nft/crear" element={<CrearNFT />} />
        <Route path="/usuario/portfolio" element={<Portfolio/>}/>
      </Routes>
    </Router>
  );
}

export default App;