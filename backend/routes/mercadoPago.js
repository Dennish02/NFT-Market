import express from "express";
const router = express.Router();
import checkOut from "../middleware/checkOut.js";

import {
  mercadoPago
} from "../controladores/mercadopago.js";


router.post("/",checkOut, mercadoPago);

  
// router.post(checkOut, añadirFavNft);


export default router;