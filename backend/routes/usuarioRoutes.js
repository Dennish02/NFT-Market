import express from "express";
import { ultimasVentas } from "../controladores/transaccionesController.js";
const router = express.Router();
import {
  googleLogin,
  registrar,
  autenticar,
  confimrar,
  olvidePassword,
  comporbarToken,
  nuevoPassword,
  perfil,
  traerUsuarios,
  cambiarImage,
  usuario,
  transferirCl,
  notificaciones,
  notificacionVista
} from "../controladores/usuarioController.js";
import checkOut from "../middleware/checkOut.js";
//Autenticacion, Registro y Confirmacion de Usuarios
router.post('/google', googleLogin);
router.post("/", registrar); //crea usuario
router.post("/login", autenticar);
router.get("/confirmar/:token", confimrar);
router.post("/olvide-password", olvidePassword);
router.route("/olvide-password/:token").get(comporbarToken).post(nuevoPassword);
router.get("/perfil", checkOut, perfil); //primero va al checkout y despues al perfil
router.get("/ultimas-ventas-de-usuario", checkOut, ultimasVentas);
router.get("/traer-usuarios", checkOut, traerUsuarios);
router.put("/imagen", checkOut, cambiarImage);
router.get("/actual", checkOut, usuario);

router.put("/transferir", checkOut, transferirCl);

router.get("/notificaciones", checkOut, notificaciones)
router.put("/notificacion/:id", checkOut, notificacionVista)

export default router;
