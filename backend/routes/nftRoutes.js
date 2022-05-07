import express from 'express';
const router = express.Router()
import checkOut from '../middleware/checkOut.js'

import {  obtenerAllNft,
    crearNft,
    editarNft,
    regalarNft,
    comprarNft,
    venderNft,
    añadirFavNft} from '../controladores/nftController.js'

router.route('/')
    .get(checkOut, obtenerAllNft)
    .post(checkOut, crearNft)
   

router.route('/:id')
    .get(checkOut, regalarNft)
    .put(checkOut, editarNft)
    .post(checkOut, comprarNft)
    .post(checkOut, venderNft)
    .post(checkOut,añadirFavNft)


 export default router;   