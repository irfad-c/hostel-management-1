const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

const connectDB = require("../config/db");
const User = require("../models/user.model");

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();
    const email = process.env.SUPER_ADMIN_EMAIL;
    const existingUser = await User.findOne({
      email: email,
    });
    if (existingUser) {
      console.log("Super admin already exist");
      process.exit(0);
    }
    const hashedPassword = await bcrypt.hash(
      process.env.SUPER_ADMIN_PASSWORD,
      10,
    );
    await User.create({
      name: process.env.SUPER_ADMIN_NAME,
      email: email,
      password: hashedPassword,
      role: "super_admin",
      isActive: true,
    });
    console.log("Super Admin created successfully");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
