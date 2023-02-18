const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  gender: String,
  class: Number,
  age: Number,
  created_at: Date,
});

module.exports = mongoose.model("Student", Schema);
