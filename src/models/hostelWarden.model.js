const mongoose = require("mongoose");

const hostelWardenSchema = new mongoose.Schema({
  hostelId: {
    type: String,
    required: true,
  },
  wardenId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("HostelWarden", hostelWardenSchema);
