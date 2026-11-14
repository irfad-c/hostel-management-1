const { body } = require("express-validator");

const validateHostel = [
  body("name").trim().notEmpty().withMessage("Hostel name is required"),

  body("code")
    .trim()
    .notEmpty()
    .withMessage("Hostel code is required.")
    .matches(/^[A-Za-z0-9-]+$/)
    .withMessage("Hostel code only contain letters,numbers and hyphens."),

  body("hostelType")
    .trim()
    .notEmpty()
    .withMessage("Hostel type is required.")
    .isIn(["BOYS", "GIRLS"])
    .withMessage("Hostel type must be BOYS/GIRLS."),

  body("capacity")
    .isInt({ min: 1 })
    .withMessage("Capacity must be a positive integer.")
    .toInt(),
];

const validateWarden = [
  body("name").trim().notEmpty().withMessage("Name is required"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide valid email.")
    .normalizeEmail(),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone()
    .withMessage("Please provide a valid phone number."),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must contain atleast 8 characters."),
];

module.exports = { validateHostel, validateWarden };
