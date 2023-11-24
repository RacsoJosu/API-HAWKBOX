const express = require("express");
const router = express.Router();

const {registerUser, login} = require("../controllers/usuarios.js")


router.post("/registro", registerUser)

router.post("/login", login)

module.exports= router
