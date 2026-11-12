const Audit = require("../models/audit.model");

async function getAudit(req, res) {
  try {
    let filter = {};

    const { action } = req.query;

    if (action) {
      filter.action = action;
    }

    const data = await Audit.find(filter);

    if (data) {
      return res
        .status(200)
        .json({ message: "Audit log fetched successfully", data });
    }
  } catch (error) {
    console.error("Error fetching audit logs.", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = getAudit;
