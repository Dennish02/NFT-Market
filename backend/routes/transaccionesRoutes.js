import express from "express";
const router = express.Router();

import {
    ultimasVentas,
    // crearTransaccion
} from "../controladores/transaccionesController.js";

// router.post('/', crearTransaccion)
router.get('/ultimas-ventas-general', ultimasVentas)

export default router