const express = require("express");
const router = express.Router();

const { createToken } = require("../controllers/usuarios.js")


router.post("/crearToke/:idUsuario/:tokenPush", createToken)

module.exports= router
