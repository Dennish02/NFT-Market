import LandingPage from "./pages/LandingPage.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ConfirmarCuenta from "./pages/ConfirmarCuenta.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import CrearNFT from "./pages/CrearNFT.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/olvide-password/:token" element={<ResetPassword />} />
        <Route path="/confirmar/:id" element={<ConfirmarCuenta />} />
        <Route path="/nft/crear" element={<CrearNFT />} />
      </Routes>
    </Router>
  );
}

export default App;
