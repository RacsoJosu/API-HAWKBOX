const express = require('express');
const authMiddleware = require('../middlewares/session');
const { getPackages, createPackage } = require('../controllers/paquetes');
const upload = require('../middlewares/upload');
const router = express.Router()

router.get("/obtenerPaquetes/:id", authMiddleware, getPackages)
router.post("/crearPaquete", authMiddleware, upload.single("File"), createPackage)

module.exports = router
