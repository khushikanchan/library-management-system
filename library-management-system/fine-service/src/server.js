require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Fine Service MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

connectDB();

app.get("/", (req, res) => {
  res.send("Fine Service is running...");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "fine-service" });
});

app.get("/api/fines", (req, res) => {
  res.json({ message: "All fines fetched successfully" });
});

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Fine Service running on port ${PORT}`);
});