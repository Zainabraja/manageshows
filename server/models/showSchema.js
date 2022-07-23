const mongoose = require("mongoose");
const User = require("./userSchema");

const showSchema = mongoose.Schema({
  title: {
    type: String,
    // required: true,
  },
  app: {
    type: String,
    // required: true,
  },
  rating: {
    type: Number,
    default: 0,
    // required: true,
  },
  review: {
    type: String,
    // required: true,
  },
});

// showSchema.statics.addShow = async function (
//   email,
//   title,
//   app,
//   rating,
//   review,
//   req,
//   res
// ) {
//   const show = await Show.findOne({ title });
//   console.log("inside show");
//   if (show) {
//     res.status(400).json({ error: "Title is taken!" });
//   } else {
//     // Create new show
//     try {
//       const newShow = new Show({ title, app, rating, review });
//       const addedShow = await newShow.save();
//       const user = await User.findOne({ email });
//       console.log("User", user);
//       console.log("newShow", newShow);
//       console.log("addedShow", addedShow);

//       user.shows.push(addedShow);
//       user.save();

//       User.findOne({ email })
//         .populate("shows")
//         .exec((err, user) => {
//           if (err) {
//             console.log("Error");
//           }
//           console.log(user);
//         });
//     } catch (err) {
//       console.log("Error", err);
//     }
//   }
// };

// taskSchema.statics.updatetask = async function (id, taskdesc, completed) {
//   if (taskdesc.length == 0) {
//     throw Error("desc blank");
//   }

//   const update = {
//     taskdesc: taskdesc,
//     completed: completed,
//   };
//   const filter = { id };
//   let task = await Task.findOneAndUpdate(filter, update, {
//     new: true,
//   });
//   return task;
// };

const Show = mongoose.model("Show", showSchema);
module.exports = Show;
