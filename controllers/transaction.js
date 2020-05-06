const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const moment = require('moment');
const {errorHandler} = require("../helpers/dbErrorHandler");
const Transaction = require('../models/Transaction');

exports.listThirty = (req, res) => {
    const userId = req.profile._id;
    const start = moment().subtract(30, "days");
    Transaction.find({whichUser: userId, createdAt : {$gte : start}})
    .select('-photo')
    .sort([['createdAt', 'desc']])
    .populate("category")
    .exec((err, transactions_data) => {
        if(err){
            return res.status(400).json({
                error : errorHandler(err)
            });
        }
        return res.json(transactions_data);
    });
};


exports.listTen = (req, res) => {
    const userId = req.profile._id;
    const start = moment().subtract(10, "days");
    Transaction.find({whichUser: userId, createdAt : {$gte : start}})
    .select('-photo')
    .sort([['createdAt', 'desc']])
    .exec((err, transactions_data) => {
        if(err){
            return res.status(400).json({
                error : errorHandler(err)
            });
        }
        return res.json(transactions_data);
    });
};



exports.photo = (req, res, next) => {
    if (req.transaction.photo.data) {
        res.set('Content-Type', req.transaction.photo.contentType);
        return res.send(req.transaction.photo.data);
    }
    next();
};


exports.getTranDay = (req, res) => {
    const userId = req.profile._id;
    const start = moment().startOf("day");
    Transaction.find({whichUser: userId, createdAt : {$gte : start}})
    .select('-photo')
    .sort([['createdAt', 'desc']])
    .exec((err, transactions_data) => {
        if(err){
            return res.status(400).json({
                error : errorHandler(err)
            });
        }
        return res.json(transactions_data);
    });
};


exports.getTranMonth = (req, res) => {
    const userId = req.profile._id;
    const start = moment().startOf("month");
    Transaction.find({whichUser: userId, createdAt : {$gte : start}})
    .select('-photo')
    .sort([['createdAt', 'desc']])
    .exec((err, transactions_data) => {
        if(err){
            return res.status(400).json({
                error : errorHandler(err)
            });
        }
        return res.json(transactions_data);
    });
};

// This function gets transactions of this week without image
exports.getTranWeek = (req, res) => {
    const userId = req.profile._id;
    const start = moment().startOf("week");
    Transaction.find({whichUser: userId, createdAt : {$gte : start}})
    .select('-photo')
    .sort([['createdAt', 'desc']])
    .exec((err, transactions_data) => {
        if(err){
            return res.status(400).json({
                error : errorHandler(err)
            });
        }
        return res.json(transactions_data);
    });
};

exports.listSome = (req, res) => {
    const userId = req.profile._id;
    Transaction.find({whichUser: userId})
    .select('-photo')
    .sort([['createdAt', 'desc']])
    .limit(12)
    .exec((err, transactions_data) => {
        if(err){
            return res.status(400).json({
                error : errorHandler(err)
            });
        }
        return res.json(transactions_data);
    });
};

exports.transactionById = (req, res, next, id) => {
    Transaction.findById(id).exec((err, transaction) => {
        if(err || !transaction){
            return res.status(400).json({
                error: "Transaction not found"
            });
        }

        req.transaction = transaction;
        next(); 
    });  
};


exports.read = (req, res) => {
    req.transaction.photo = undefined;
    return res.json(req.transaction);
};

exports.remove = (req, res) => {
    let transaction = req.transaction;
    transaction.remove((err, deletedTransaction) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            deletedTransaction,
            "message" : "Transaction is deleted"
        });
    });
};


exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }

        const { title, description, price, category, whichUser } = fields;

        if( !title || !description || !price || !category || !whichUser){
            return res.status(400).json({
                error: "All fields are required"
            }); 
        }

        let transaction = new Transaction(fields);
        if(files.photo){
            if(files.photo.size > 1500000){
                return res.status(400).json({
                    error: "Image should be less than 1 mb"
                });
            }
            transaction.photo.data = fs.readFileSync(files.photo.path);
            transaction.photo.contentType = files.photo.type;
        }

        transaction.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error : errorHandler(err)
                })
            }
            res.json(result);
        });
    });
};


exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }

        const { title, description, price, category, whichUser } = fields;

        if( !title || !description || !price || !category || !whichUser){
            return res.status(400).json({
                error: "All fields are required"
            }); 
        }

        let transaction = req.transaction;
        transaction = _.extend(transaction, fields);
        if(files.photo){
            if(files.photo.size > 1500000){
                return res.status(400).json({
                    error: "Image should be less than 1 mb"
                });
            }
            transaction.photo.data = fs.readFileSync(files.photo.path);
            transaction.photo.contentType = files.photo.type;
        }

        transaction.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error : errorHandler(err)
                })
            }
            res.json(result);
        });
    });
};