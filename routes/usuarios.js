const express = require("express");
const router = express.Router();

const { createToken, sendNotification } = require("../controllers/usuarios.js")


router.post("/crearToken/:idUsuario/:tokenPush", createToken)
router.post("/enviarNotificacion", sendNotification )

module.exports= router
