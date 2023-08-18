const express = require("express")
const router = express.Router()

const authController = require("../controller/auth")
const authServices = require("../services/auth")

router.post("/signup", authController.postSignup, authServices.postSignup)

router.post("/login", authController.postLogin, authServices.postLogin)

module.exports = router;