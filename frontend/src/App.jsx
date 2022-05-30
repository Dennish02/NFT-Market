import LandingPage from "./pages/LandingPage.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import ConfirmarCuenta from "./pages/ConfirmarCuenta.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import OlvidePassword from "./pages/OlvidePassword.jsx";
//tostify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CrearNFT from "./pages/CrearNFT.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import VerificacionUsuario from "./pages/VerificacionUsuario.jsx";
import Loguin from "./pages/Loguin.jsx";
import Register from "./pages/Register.jsx";
import Wallet from "./pages/Wallet.jsx";
import Settings from "./pages/Settings.jsx";
import UpdatePassword from "./componentes/settings/updatePassword";
import Trades from "./pages/Trades.jsx";
import Favoritos from "./pages/Favoritos";
import ConfirmarCompra from "./componentes/wallet/ConfirmarCompra.jsx";
import Failure from "./componentes/wallet/Failure.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Loguin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/olvide-password/" element={<OlvidePassword />} />
        <Route path="/olvide-password/:token" element={<ResetPassword />} />
        <Route path="/confirmar/:id" element={<ConfirmarCuenta />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/usuario/favoritos" element={<VerificacionUsuario />}>
          <Route index element={<Favoritos />} />
        </Route>
        <Route path="/home/" element={<VerificacionUsuario />}>
          <Route index element={<Home />} />
        </Route>
        <Route
          path="/home/usuario/portfolio/"
          element={<VerificacionUsuario />}
        >
          <Route index element={<Portfolio />} />
        </Route>
        <Route
          path="/home/usuario/nft/crear/"
          element={<VerificacionUsuario />}
        >
          <Route index element={<CrearNFT />} />
        </Route>
        <Route path="/home/usuario/wallet/" element={<VerificacionUsuario />}>
          <Route index element={<Wallet />} />
        </Route>
        <Route
          path="home/usuario/wallet/confirmar"
          element={<VerificacionUsuario />}
        >
          <Route index element={<ConfirmarCompra />} />
        </Route>
        <Route
          path="/home/usuario/wallet/failure"
          element={<VerificacionUsuario />}
        >
          <Route index element={<Failure />} />
        </Route>
        <Route path="home/usuario/trades" element={<VerificacionUsuario />}>
          <Route index element={<Trades />} />
        </Route>
        <Route path="/home/usuario/setting" element={<VerificacionUsuario />}>
          <Route index element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
