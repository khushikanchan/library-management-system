require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Book Service is running...");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "book-service" });
});

app.use("/", bookRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Book Service running on port ${PORT}`);
});