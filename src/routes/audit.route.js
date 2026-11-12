const express = require("express");
const getAudit = require("../controllers/audit.controller");
const authorizeRoles = require("../middlewares/authorize.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  authorizeRoles("super_admin", "admin"),
  getAudit,
);

module.exports = router;
