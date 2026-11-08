const express = require("express");
const router = express.Router();
const { postHostel, getHostel } = require("../controllers/hostel.controller");
const { validateHostel } = require("../validators/hostel.validator.js");
const handleValidationErrors = require("../middlewares/validator.middleware");
const authMiddleware = require("../middlewares/auth.middleware.js");
const authorizeRoles = require("../middlewares/authorize.middleware.js");

router.post(
  "/",
  authMiddleware,
  authorizeRoles("super_admin"),
  validateHostel,
  handleValidationErrors,
  postHostel,
);

router.get(
  "/",
  authMiddleware,
  authorizeRoles("super_admin", "admin"),
  getHostel,
);

module.exports = router;
