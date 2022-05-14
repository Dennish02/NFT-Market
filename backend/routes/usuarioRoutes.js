import express from 'express';
import { ultimasVentas } from '../controladores/transaccionesController.js';
const router = express.Router()
import {  registrar, 
    autenticar, 
    confimrar,
    olvidePassword, 
    comporbarToken, 
    nuevoPassword,
    perfil } from '../controladores/usuarioController.js'
import checkOut from '../middleware/checkOut.js'
//Autenticacion, Registro y Confirmacion de Usuarios





router.post('/', registrar); //crea usuario
router.post('/login', autenticar)
router.get('/confirmar/:token', confimrar)
router.post('/olvide-password', olvidePassword)
router.route('/olvide-password/:token')
    .get(comporbarToken)
    .post(nuevoPassword)
router.get('/perfil', checkOut, perfil);//primero va al checkout y despues al perfil
router.get('/ultimas-ventas-de-usuario', checkOut, ultimasVentas)


export default router;