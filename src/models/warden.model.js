const mongoose = require("mongoose");

const wardenSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Name is required."],
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: [true, "Email is required."],
  },
  phone: {
    type: String,
    trim: true,
    required: [true, "Phone number is required."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  role: {
    type: String,
    default: "warden",
  },
});

module.exports = mongoose.model("Warden", wardenSchema);
