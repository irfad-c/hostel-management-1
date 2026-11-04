const Hostel = require("../models/hostel.model");

async function hostelController(req, res) {
  try {
    const { name, code, hostelType, capacity } = req.body;
    const normalizedCode = code.toUpperCase();
    const existingCode = await Hostel.findOne({
      code: normalizedCode,
    });
    if (existingCode) {
      return res.status(409).json({ message: "Code already exist." });
    }
    const hostel = await Hostel.create({
      name,
      code: normalizedCode,
      hostelType,
      capacity,
    });
    return res
      .status(201)
      .json({ message: "New hostel created successfully.", data: hostel });
  } catch (error) {
    if ((error.code === 11000)) {
      return res.status(409).json({ message: "Code already exist." });
    }
    console.error("Error in the hostel creation.", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = hostelController;
