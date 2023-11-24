const express = require('express');
const authMiddleware = require('../middlewares/session');
const { getPackages } = require('../controllers/paquetes');
const router = express.Router()

router.get("/obtenerPaquetes/:id",authMiddleware,getPackages )

module.exports = router

