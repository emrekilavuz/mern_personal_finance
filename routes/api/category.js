const express = require("express");
const router = express.Router();

const { createCategory, categoryById, read, update, remove, list, listById } = require("../../controllers/category");

const { requireSignIn , isAuth} = require("../../controllers/auth");
const { userById } = require("../../controllers/user");

router.post("/category/createCategory/:userId", requireSignIn , isAuth, createCategory);
router.get("/category/:categoryId", read);
router.put("/category/:categoryId/:userId", requireSignIn, isAuth, update);
router.delete("/category/:categoryId/:userId", requireSignIn, isAuth, remove);
router.get("/categories", list);
router.get("/categories/:userId", listById);


router.param("categoryId", categoryById);
router.param("userId", userById);

module.exports = router;