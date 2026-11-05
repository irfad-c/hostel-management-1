const bcrypt = require("bcrypt");
const Warden = require("../models/warden.model");

async function wardenController(req, res) {
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

    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = wardenController;
