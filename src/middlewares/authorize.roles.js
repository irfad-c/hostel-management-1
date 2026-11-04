function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Authorization denied for this role." });
    }
    next();
  };
}

module.exports = authorizeRoles;
