const express = require('express');
const router = express.Router();
const {signup, login, logout, requireSignIn} = require('../../controllers/auth');
const { userSignUpValidator } = require('../../validator/index');

router.post("/signup",userSignUpValidator, signup);
router.post("/login",login);
router.get("/logout",logout);


module.exports = router;



