import LandingPage from "./pages/LandingPage.jsx";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ConfirmarCuenta from "./pages/ConfirmarCuenta.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

import OlvidePassword from "./pages/OlvidePassword.jsx";

import CrearNFT from "./pages/CrearNFT.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import VerificacionUsuario from "./pages/VerificacionUsuario.jsx";
import Loguin from "./pages/Loguin.jsx";
import Register from "./pages/Register.jsx";


function App() {
  return (
    <Router>
      <Routes>

        <Route  path='/' element={<LandingPage/>}/> 
        <Route  path='/login' element={<Loguin/>}/> 
        <Route  path='/register' element={<Register/>}/> 
        <Route path='/olvide-password/' element={<OlvidePassword />} />
          <Route path='/olvide-password/:token' element={<ResetPassword />} />
          <Route path="/confirmar/:id" element={<ConfirmarCuenta />} />

       
          <Route path='/home/' element={<VerificacionUsuario/>}>
                <Route index element={<Home/>}/>
          </Route>
          <Route path='/home/usuario/portfolio/' element={<VerificacionUsuario/>}>
                <Route index element={<Portfolio />} />       
          </Route>
          <Route path='/home/usuario/nft/crear/' element={<VerificacionUsuario/>}>
                <Route index element={<CrearNFT />} />
          </Route>

        <Route path="*" element={<Navigate replace to='/'/>} />
      </Routes>
    </Router>
  );
}

export default App;

/**
 * 
 *   <Route path='/home' element={<Home />} />
          <Route path="/nft/crear" element={<CrearNFT />} />
          <Route path="/usuario/portfolio" element={<Portfolio />} />
 */