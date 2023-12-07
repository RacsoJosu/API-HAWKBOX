const express = require('express');

const { createTransito, getTransito} = require('../controllers/transito.controller');
const router = express.Router()

router.post("/crearTransito", createTransito)
router.get("/obtenerTransito", getTransito)

module.exports = router