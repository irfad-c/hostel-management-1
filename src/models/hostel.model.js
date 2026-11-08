const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    code: {
      type: String,
      required: [true, "Hostel code is required."],
      unique: true,
      trim: true,
      uppercase: true,
    },
    hostelType: {
      type: String,
      required: [
        true,
        "Hostel type is required and it should be in capital letters.",
      ],
      enum: ["BOYS", "GIRLS"],
    },
    capacity: {
      type: Number,
      required: [true, "Hostel capacity is required."],
      min: [1, "Capacity must be atleast 1"],
      validate: {
        validator: Number.isInteger,
        message: "Capacity must be an integer.",
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Hostel", hostelSchema);
