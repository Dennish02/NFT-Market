import express from "express";
const router = express.Router();
import checkOut from "../middleware/checkOut.js";

import {
  crearColeccion,
  obtenerColecciones,
  coleccionesUsuario,
} from "../controladores/coleccionController.js";

router.get("/usuario", checkOut, coleccionesUsuario);

router
  .route("/")
  .get(checkOut, obtenerColecciones)
  .post(checkOut, crearColeccion);

export default router;
