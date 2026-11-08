const bcrypt = require("bcrypt");
const Warden = require("../models/warden.model");
const HostelWarden = require("../models/hostelWarden.model");
const Hostel = require("../models/hostel.model");

async function createWarden(req, res) {
  try {
    const { name, email, phone, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const data = await Warden.create({
      name,
      email,
      phone,
      password: hashPassword,
    });

    const wardenData = data.toObject();
    delete wardenData.password;

    return res
      .status(201)
      .json({ message: "New warden created successfully.", wardenData });
  } catch (error) {
    console.error("Error creating warden", error);

    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already exist." });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
}

async function assignWarden(req, res) {
  try {
    const { hostelId } = req.params;
    if (!hostelId) {
      return res.status(400).json({ message: "HostelId is required." });
    }
    const hostelData = await Hostel.findById(hostelId);
    if (!hostelData) {
      return res.status(404).json({ message: "Hostel doesn't exist." });
    }

    if (hostelData.isActive !== true) {
      return res.status(403).json({ message: "Hostel is not active" });
    }
    const { wardenId } = req.body;
    if (!wardenId) {
      return res.status(400).json({ message: "WardenId is required." });
    }
    const wardenData = await Warden.findById(wardenId);

    if (!wardenData) {
      return res.status(404).json({ message: "Warden doesn't exist." });
    }

    if (wardenData.role !== "warden") {
      return res.status(403).json({ message: "User role is not warden" });
    }

    if (wardenData.isActive !== true) {
      return res.status(403).json({ message: "Warden is not active" });
    }

    const existingData = await HostelWarden.findOne({ wardenId });

    if (existingData) {
      return res.status(409).json({
        message: "This warden is already assigned to another hostel.",
      });
    }

    const newAssignment = await HostelWarden.create({
      wardenId,
      hostelId,
    });

    return res.status(201).json({
      message: "New warden assigned successfully",
      data: newAssignment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = { createWarden, assignWarden };
