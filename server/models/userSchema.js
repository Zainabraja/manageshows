const mongoose = require("mongoose");
const Show = require("./showSchema");
// const { isEmail } = require("validator");
// const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please enter email!"],
    lowercase: true,
    // validate: [isEmail, "Please enter a valid email!"],
  },
  //   password: {
  //     type: String,
  //     required: [true, "Please enter password!"],
  //     minlength: [6, "Password should contain minimum 6 characters!"],
  //   },
  shows: [{ type: mongoose.Schema.Types.ObjectId, ref: "Show" }],
});

// userSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

userSchema.statics.signin = async function (name, email, req, res) {
  // const myemail = "zainabraja53@gmail.com";
  // const myuser = await this.findOne({ email: myemail });
  // console.log(myuser);
  // const show = new Show({ title: "Harry Potter", app: "Prime" });
  // show.save();
  // myuser.shows.push(show);
  // myuser.save();
  // User.findOne({ email: myemail })
  //   .populate("shows") // only works if we pushed refs to person.eventsAttended
  //   .exec(function (err, user) {
  //     if (err) return handleError(err);
  //     console.log(user);
  //   });

  const update = { name };
  const filter = { email };
  const user = await User.findOneAndUpdate(filter, update, {
    new: true,
  });
  if (!email) {
    throw Error("no email");
  }

  if (user) {
    if (user.email == email) {
      return user;
    }
  }
  // create new user
  try {
    const newUser = new User({ name, email });

    const signedUser = await newUser.save();

    if (signedUser) {
      res.status(201).json({ message: "Logged in Successfully!" });
    }
  } catch (err) {
    console.log("Error", err);
  }
};

// userSchema.statics.updatefun = async function (
//   name,
//   image,
//   username,
//   title,
//   password
// ) {
//   if (name.length == 0) {
//     throw Error("name blank");
//   }
//   if (title.length == 0) {
//     throw Error("title blank");
//   }
//   if (password.length > 0 && password.length < 6) {
//     throw Error("password length");
//   }

//   if (password.length == 0) {
//     const user = await User.findOne({ username });
//     password = user.password;
//   } else {
//     const salt = await bcrypt.genSalt();
//     password = await bcrypt.hash(password, salt);
//   }

//   const update = {
//     name,
//     title,
//     image,
//     password,
//   };
//   const filter = { username };
//   let doc = await User.findOneAndUpdate(filter, update, {
//     new: true,
//   });
//   return doc;
// };

const User = mongoose.model("User", userSchema);
module.exports = User;
