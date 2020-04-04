const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    account_title: {
      type: String,
      required: true,
      maxlength: 64
    },
    account_amount: {
      type: Number,
      required: true,
      default: 0
    },
    account_type: {
      type: String,
      required: true,
      default: "TL",
      maxlength: 10
    },
    whichUser : {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    coefficient: {
      type: Number,
      default: 1
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema);
