import express from "express";
const router = express.Router();
import checkOut from "../middleware/checkOut.js";

import { payMercadoPago, setCoins } from "../controladores/payMercadoPago.js";


router.post("/", payMercadoPago);
router.put("/setcoins",checkOut, setCoins);

  

router.post("/", payMercadoPago);
router.put("/setcoins",checkOut, setCoins);

export default router;
