import express from 'express'
const router = express.Router()
import checkOut from '../middleware/checkOut.js'

import {
    crearColeccion,
    coleccionesDeUsuario
} from "../controladores/coleccionController.js"

router.post('/', checkOut, crearColeccion)
router.get('/', checkOut, coleccionesDeUsuario)

export default router