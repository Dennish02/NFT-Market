const { Router } = require('express');
// Importamos todos los routers;
const user = require('./user.js');
const wallet = require('./wallet.js');
const nft = require('./nft.js');

const router = Router();

// Configurar los routers
router.use('/user', user);

router.use('/wallet', wallet);

router.use('/nft', nft);

module.exports = router;