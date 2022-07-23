const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
// const Task = require("../models/task");
require("dotenv").config();

secret = process.env.SECRET;

const cookieAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.render("/signin");
  } else {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/signin");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  }
};

const verifyUser = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log("Verify", token);
  if (!token) {
    // console.log("!token");
    req.user = null;
    res.redirect("/");
  } else {
    jwt.verify(token, secret, async (err, decodedToken) => {
      if (err) {
        req.user = null;
        res.redirect("/");
      } else {
        let user = await User.findById(decodedToken.id).populate("shows");
        console.log(user);
        // res.locals.user = user;
        req.token = token;
        req.user = user;
        req.id = user._id;
        next();
      }
    });
  }
};

// const checkTask = async (req, res, next) => {
//   let task = await Task.find();
//   if (task) {
//     res.locals.task = task;
//     next();
//   } else {
//     res.locals.task = null;
//     next();
//   }
// };

// const addCourse = async (req, res, next) => {
//   const username = await User.find();
//   console.log(username);
//   let course = await Course.find();
//   if (course) {
//     res.locals.course = course;
//     next();
//   } else {
//     // let res = await Course.create()
//     res.locals.course = null;
//     next();
//   }
// };

module.exports = { cookieAuth, verifyUser };
// module.exports = { cookieAuth, verifyUser, checkTask, addCourse };
