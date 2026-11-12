const Hostel = require("../models/hostel.model");
const Audit = require("../models/audit.model");

async function postHostel(req, res) {
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

    await Audit.create({
      actorId: req.user.id,
      action: "HOSTEL_CREATED",
      entityId: hostel._id,
      details: {
        name: hostel.name,
        hostelCode: hostel.code,
        hostelType: hostel.hostelType,
        capacity: hostel.capacity,
      },
    });

    return res
      .status(201)
      .json({ message: "New hostel created successfully.", data: hostel });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Code already exist." });
    }
    console.error("Error in the hostel creation.", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

async function getHostel(req, res) {
  try {
    const { hostelType } = req.query;

    let typeOfHostels = ["BOYS", "GIRLS"];

    if (hostelType && !typeOfHostels.includes(hostelType)) {
      return res.status(400).json({ message: "Invalid hostelType" });
    }

    let filter = {};

    if (hostelType) {
      filter.hostelType = hostelType;
    }

    const data = await Hostel.find(filter);

    return res
      .status(200)
      .json({ message: "Hostel data fetched successfully.", data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { postHostel, getHostel };
