const express = require('express');
const router = express.Router();

const { requireSignIn, isAuth, isAdmin } = require('../../controllers/auth');
const { userById, updateUserNetBalance } = require('../../controllers/user');

router.get("/secret/:userId", requireSignIn, isAuth, (req, res) => {
    res.json({
        user: req.profile
    });
});

router.put("/secret/updateBalance/:userId", requireSignIn, isAuth, updateUserNetBalance);

router.param("userId", userById);

module.exports = router;
