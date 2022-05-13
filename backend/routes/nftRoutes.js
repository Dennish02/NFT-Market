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

router.route("/").get(obtenerAllNft).post(checkOut, crearNft);
router.get("/portfolio", checkOut, allNftUser);
router.put("/gift", checkOut, regalarNft);

router
  .route("/:id")
  .get(checkOut, obtenerNft)
  .put(checkOut, editarNft)
  .post(checkOut, añadirFavNft);

router.route("/vender/:id").put(checkOut, venderNft);
router.route("/comprar/:id").post(checkOut, comprarNft);

export default router;
