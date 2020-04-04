const express = require('express');
const router = express.Router();

const { requireSignIn, isAuth} = require("../../controllers/auth");
const {createAccount, getAccountByUser, accountById, updateAccountAmount} = require("../../controllers/account");
const { userById } = require("../../controllers/user");

router.post("/account/create/:userId", requireSignIn, isAuth, createAccount);
router.get("/account/getByUser/:userId", requireSignIn, isAuth, getAccountByUser);
router.put("/account/updateAmount/:accountId/:userId", requireSignIn, isAuth, updateAccountAmount);


router.param("userId", userById);
router.param("accountId", accountById);

module.exports = router;