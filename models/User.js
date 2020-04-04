const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");


const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    hashed_password: {
      type: String,
      required: true
    },
    register_date: {
      type: Date,
      default: Date.now
    },
    role: {
      type: Number,
      default: 0
    },
    netBalance: {
      type: Number,
      default : 0
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    salt: {
      type: String
    }
  },
  { timestamps: true }
);

UserSchema.virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

UserSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function(password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  }
};

module.exports = User = mongoose.model("User", UserSchema);

