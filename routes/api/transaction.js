const express = require("express");
const router = express.Router();

const { create, transactionById, read, remove, update, listSome, getTranWeek, photo, getTranMonth, getTranDay, listTen, listThirty } = require("../../controllers/transaction");

const { requireSignIn , isAuth} = require("../../controllers/auth");
const { userById } = require("../../controllers/user");

router.get("/transaction/:transactionId", read);
router.get("/transaction/listSome/:userId", listSome);
router.get("/transaction/thisWeek/:userId", getTranWeek);
router.get("/transaction/thisMonth/:userId", getTranMonth);
router.get("/transaction/thisDay/:userId", getTranDay);
router.get("/transaction/listTen/:userId", listTen);
router.get("/transaction/listThirty/:userId", listThirty);
router.get("/transaction/photo/:transactionId", photo);
router.post("/transaction/create/:userId", requireSignIn , isAuth, create);
router.delete('/transaction/:transactionId/:userId', requireSignIn, isAuth, remove);
router.put('/transaction/:transactionId/:userId', requireSignIn, isAuth, update);
router.param("userId", userById);
router.param("transactionId", transactionById);
module.exports = router;