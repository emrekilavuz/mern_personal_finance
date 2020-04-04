const User = require('../models/User');

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error : "User not found"
            });
        }
        req.profile = user;
        next();
    });
};

exports.updateUserNetBalance = (req, res) => {
    const user = req.profile;
    user.netBalance = req.body.netBalance;
    user.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

