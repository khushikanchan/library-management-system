require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Transaction Service MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

connectDB();

app.get("/", (req, res) => {
  res.send("Transaction Service is running...");
});

app.use("/api/transactions", transactionRoutes);

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`Transaction Service running on port ${PORT}`);
});