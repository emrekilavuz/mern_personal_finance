const Account = require('../models/Account');
const {errorHandler} = require("../helpers/dbErrorHandler");

exports.updateAccountAmount = (req, res) => {
    const account = req.account;
    account.account_amount += req.body.account_amount;
    console.log(typeof account.account_amount);
    console.log(account.account_amount);
    account.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};


exports.accountById = (req, res, next, id) => {
    Account.findById(id).exec((err, account) => {
        if(err || !account){
            return res.status(400).json({
                error: "Bir hata oluştu"
            });
        }
        req.account = account;
        next();
    });
};

exports.getAccountByUser = (req, res) => {
    const userId = req.profile._id;
    Account.find({whichUser : userId}).exec((err, data) => {
        if(err) {   
            return res.status(400).json({
                error: "Bir hata oluştu"
            });
        }
        res.json(data);
    });

};

exports.createAccount = (req, res) => {
    const account = new Account(req.body);
    account.save((err, data) => {
        if(err) { 
            return res.status(400).json({
                error : errorHandler(err)
            });
        }
        res.json({data});
    });
};

