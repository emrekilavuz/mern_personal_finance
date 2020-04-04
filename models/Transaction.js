const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const transactionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 64
    },
    description: {
        type: String,
        required: true,
        maxlength: 1500
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 32
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true
    },
    whichAccount: {
        type: ObjectId,
        ref: 'Account',
        required : true
    },  
    whichUser: {
        type: ObjectId,
        ref: 'User',
        required: true
    }, 
    photo: {
        data: Buffer,
        contentType: String 
    }
}, 
{timestamps: true}
);

module.exports = mongoose.model("Transaction", transactionSchema);