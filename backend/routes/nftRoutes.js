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
  tradeOffer,
  seeOffers,
  responseOffer,
  ordenarNFT,
  likeNft,
  getPortfolioValue,
  topPortfolios,
  cancelOffer
} from "../controladores/nftController.js";

import { crearTransaccion } from "../controladores/transaccionesController.js";
router.route("/").get(checkOut, obtenerAllNft).post(checkOut, crearNft);
router.get("/portfolio", checkOut, allNftUser);
router.put("/gift", checkOut, regalarNft);
router.put("/:id", checkOut, editarNft);
router.get(checkOut, obtenerNft);

router.post("/tradeoffer", checkOut, tradeOffer);
router.get("/seeoffers", checkOut, seeOffers);
router.post("/responseoffer", checkOut, responseOffer);
router.post("/canceloffer", checkOut, cancelOffer);

router.get("/valueport", checkOut, getPortfolioValue);
router.get("/wealthyportfolios", checkOut, topPortfolios);

router.route("/favoritos/:id").put(checkOut, añadirFavNft);
router.route("/sacarfavoritos/:id").put(checkOut, eliminarFavNft);

router.route("/like/:id").put(checkOut, likeNft);

router.route("/vender/:id").put(checkOut, venderNft);
router.route("/comprar/:id").post(checkOut, comprarNft, crearTransaccion);

router.route("/ordenar").get(checkOut, ordenarNFT);
export default router;
