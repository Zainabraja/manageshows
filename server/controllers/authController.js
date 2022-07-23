const jwt = require("jsonwebtoken");
const { model } = require("mongoose");
const User = require("../models/userSchema");
const Show = require("../models/showSchema");
require("dotenv").config();

secret = process.env.SECRET;

const errorHandler = (err) => {
  console.log(err.message, err.code);
  // console.log(err.username)
  let errors = { email: "" };

  if (err.message === "no email") {
    errors.email = "Please enter email!";
  }

  if (err.message.includes("User validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// create json web token
const maxAge = 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, secret, {
    expiresIn: maxAge,
  });
};

module.exports.signin_get = (req, res) => {
  res.render("signin", { title: "Signin" });
};

module.exports.signin_post = async (req, res) => {
  const { name, email } = req.body;
  console.log(name, email);

  if (!email) {
    const errors = "no email";
    res.status(400).json({ errors });
  }

  try {
    const user = await User.signin(name, email);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    console.log(err);
    const errors = errorHandler(err);
    res.status(400).json({ errors });
  }
};

module.exports.addshow_post = async (req, res) => {
  const { email, title, app, rating, review } = req.body;
  console.log(email, title, app, rating, review);
  try {
    const show = await Show.findOne({ title });
    console.log("inside show");
    if (show) {
      res.status(400).json({ error: "Title is taken!" });
    } else {
      // Create new show
      try {
        const newShow = new Show({ title, app, rating, review });
        const addedShow = await newShow.save();
        const user = await User.findOne({ email });
        console.log("User", user);
        console.log("newShow", newShow);
        console.log("addedShow", addedShow);

        user.shows.push(addedShow);
        user.save();

        User.findOne({ email })
          .populate("shows")
          .exec((err, user) => {
            if (err) {
              console.log("Error");
            }
            console.log(user);
          });
        res.status(201).json({ message: "Logged in Successfully!" });
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
    const errors = errorHandler(err);
    res.status(400).json({ errors });
  }
};

module.exports.updateshow_post = async (req, res) => {
  const { title, app, rating, review } = req.body;
  try {
    const update = { app, rating, review };
    const filter = { title };
    const show = await Show.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(201).json({ show: show._id });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors });
  }
};

module.exports.deleteshow_post = async (req, res) => {
  const { id, email, title } = req.body;
  // const usertemp = await User.findOne({ email });
  // const shows = usertemp.shows;
  // console.log(shows);
  const user = await User.findOneAndUpdate(
    { email },
    { $pull: { shows: { id } } }
  );

  User.findOneAndUpdate(
    { email },
    {
      $pull: {
        shows: id,
      },
    },
    function (err, model) {
      if (!err) {
        Show.findByIdAndRemove({ _id: id }, (err) => {
          if (err) res.json(err);
          else {
            res.json("Succesfully removed");
            console.log("removed");
          }
        });
      } else {
        res.status(500).json(err);
      }
    }
  );
  console.log(user);

  // user.update({ shows: id }, { $set: { shows: null } });
  // const show = await Show.findByIdAndDelete(id, { new: true });
  // console.log(user);
  // res.status(201).json({ task: task._id });
};

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.render("signin", { title: "Signin" });
};
