const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Transaction routes working" });
});

router.post("/issue", (req, res) => {
  res.json({ message: "Book issued successfully" });
});

router.post("/return", (req, res) => {
  res.json({ message: "Book returned successfully" });
});

router.get("/health", (req, res) => {
  res.json({ status: "ok", route: "transaction-routes" });
});

module.exports = router;