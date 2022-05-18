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
  eliminarFavNft,
  allNftUser,
  obtenerNft,
} from "../controladores/nftController.js";

import { crearTransaccion } from "../controladores/transaccionesController.js";
router.route("/").get(checkOut, obtenerAllNft).post(checkOut, crearNft);
router.get("/portfolio", checkOut, allNftUser);
router.put("/gift", checkOut, regalarNft);
router.put("/:id", checkOut, editarNft);
router.get(checkOut, obtenerNft);
  
router.route("/favoritos/:id").put(checkOut, añadirFavNft);
router.route("/sacarfavoritos/:id").put(checkOut, eliminarFavNft);

router.route("/vender/:id").put(checkOut, venderNft);
router.route("/comprar/:id").post(checkOut, comprarNft, crearTransaccion);

export default router;
