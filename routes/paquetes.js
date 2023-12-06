const express = require('express');
const authMiddleware = require('../middlewares/session');
const { getPackages, createPackage } = require('../controllers/paquetes');
const router = express.Router()

router.get("/obtenerPaquetes/:id", authMiddleware, getPackages)
router.post("/crearPaquete", authMiddleware, createPackage)

module.exports = router
