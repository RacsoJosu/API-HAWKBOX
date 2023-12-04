const express = require("express");
const router = express.Router();

const { createToken } = require("../controllers/usuarios.js")


router.post("/crearToken/:idUsuario/:tokenPush", createToken)

module.exports= router
