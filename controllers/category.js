const Category = require("../models/Category");
const errorHandler = require("../helpers/dbErrorHandler");

exports.listById = (req, res) => {
    //console.log(req);
    const userId = req.profile._id;
    Category.find({whichUser : userId}).exec((err, data) => {
        if(err) {   
            return res.status(400).json({
                error: "Bir hata oluştu"
            });
        }
        res.json(data);
    });
};

exports.list = (req, res) => {
    Category.find().exec((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};


exports.remove = (req, res) => {
    const category = req.category;
    category.remove((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message : "Category deleted"
        });
    });
};


exports.update = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};


exports.read = (req, res) => {
    return res.json(req.category);
};

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if(err || !category){
            return res.status(400).json({
                error: "Bir hata oluştu"
            });
        }
        req.category = category;
        next();
    });
};


exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, data) => {
        if(err) { 
            return res.status(400).json({
                error : "Bir hata oluştu"
            });
        }
        res.json({data});
    });
};