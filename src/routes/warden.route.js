const express = require("express");
const router = express.Router();

const wardenController = require("../controllers/warden.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const authorizeRoles = require("../middlewares/authorize.roles");
const { validateWarden } = require("../validators/hostel.validator.js");
const handleValidationErrors = require("../middlewares/validator.middleware.js");


router.post(
  "/",
  authMiddleware,
  authorizeRoles("super_admin", "admin"),validateWarden,handleValidationErrors,
  wardenController,
);

module.exports = router;
