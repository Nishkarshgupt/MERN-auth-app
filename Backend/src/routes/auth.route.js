const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth.controller")
const authValidation = require("../middlewares/authValidation")

router.post('/signup',authValidation.signUpValidation, authController.signUp);
router.post("/login", authValidation.loginValidation, authController.login)

module.exports = router