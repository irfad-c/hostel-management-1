const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token is missing" });
    }

    const [Bearer, token] = authHeader.split(" ");
    if (Bearer !== "Bearer" || !token) {
      return res.status(401).json({ message: "Token format is wrong" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}

module.exports = authMiddleware;
