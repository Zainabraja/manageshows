const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("./models/userSchema");
const authRoutes = require("./routes/authRoutes");

const express = require("express");
const app = express();

const cookies = require("cookie-parser");
app.use(cookies());

dotenv.config({ path: "./.env" });

const DB = process.env.DB;
const port = process.env.PORT;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Signin");
});

// app.post("/signin", async (req, res) => {
//   //   res.json({ message: req.body });
//   const { name, email } = req.body;
//   //   User.findOne({ email })
//   //     .then((userExist) => {
//   //       if (userExist) {
//   //         // show user details
//   //         // edit details
//   //       }
//   try {
//     const user = new User({ name, email });

//     const signedUser = await user.save();

//     if (signedUser) {
//       res.status(201).json({ message: "Logged in Successfully!" });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

app.use(authRoutes);

app.listen(port, () => {
  console.log("Listening on port 3001!");
});
