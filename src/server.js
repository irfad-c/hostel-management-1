const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.route.js");
const hostelRoutes = require("./routes/hostel.route.js");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/hostels", hostelRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running on ${port}`);
    });
  } catch (error) {
    console.error("Server starting error.", error);
  }
};

startServer();
