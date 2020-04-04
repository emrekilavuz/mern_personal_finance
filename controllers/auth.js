const User = require("../models/User");
const { errorHandler } = require("../helpers/dbErrorHandler");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  console.log("request body : ", req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err)
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User does not exist, please sign up"
      });
    }

    if(!user.authenticate(password)){
        console.log(err);
        console.log(user);
        return res.status(401).json({
            error : 'Email and password dont match'
        });
    }

    const token = jwt.sign({_id: user._id}, process.env.jwtSecret);

    res.cookie("t", token, { expire: new Date() + 9999 });

    const { _id, name, email, role, netBalance } = user;

    return res.json({ token, user: { _id, name, email, role, netBalance } });
  });
};


exports.logout = (req, res) => {
  res.clearCookie("t");
  res.json({message: "Logout success"});
};

exports.requireSignIn = expressJwt({
  secret: process.env.jwtSecret,
  userProperty: "auth"
});

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!user){
      return res.status(403).json({
        error: "Access denied"
      });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
  if(re.profile.role === 0) {
    return res.status(403).json({
      error : 'Admin access denied'
    });
  }
  next();
};