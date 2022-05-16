import express from "express";
const router = express.Router();
import checkOut from "../middleware/checkOut.js";

import {
  obtenerAllNft,
  crearNft,
  editarNft,
  regalarNft,
  comprarNft,
  venderNft,
  añadirFavNft,
  allNftUser,
  obtenerNft,
} from "../controladores/nftController.js";

import { crearTransaccion } from "../controladores/transaccionesController.js";
router.route("/").get(checkOut, obtenerAllNft).post(checkOut, crearNft);
router.get("/portfolio", checkOut, allNftUser);
router.put("/gift", checkOut, regalarNft);
router.put("/:id", checkOut, editarNft);
router.get(checkOut, obtenerNft);
  
// router.post(checkOut, añadirFavNft);

router.route("/vender/:id").put(checkOut, venderNft);
router.route("/comprar/:id").post(checkOut, comprarNft, crearTransaccion);

export default router;
