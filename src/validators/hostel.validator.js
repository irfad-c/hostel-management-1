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

module.exports = validateHostel;
