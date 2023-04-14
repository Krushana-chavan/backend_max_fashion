
const express = require("express")
const {Authcontroller}  = require("../Controllers/auth.contrllers")
const authrouter = express.Router()

authrouter.post("/signup",Authcontroller.signup)
authrouter.post("/login",Authcontroller.login)
module.exports = {authrouter}