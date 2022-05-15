import express from "express";
const router = express.Router();

import {
    ultimasVentas,
    // crearTransaccion
} from "../controladores/transaccionesController.js";
import checkOut from "../middleware/checkOut.js";

// router.post('/', crearTransaccion)
router.get('/ultimasVentas',checkOut, ultimasVentas)

export default router