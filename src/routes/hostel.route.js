const express = require("express");
const router = express.Router();
const hostelController = require("../controllers/hostel.controller");
const validateHostel = require("../validators/hostel.validator.js");
const handleValidationErrors = require("../middlewares/validator.middleware");

router.post("/", validateHostel, handleValidationErrors, hostelController);

module.exports = router;
