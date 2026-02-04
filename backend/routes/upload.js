const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const Transaction = require("../models/Transaction");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

/* ✅ TEST ROUTE (Browser GET check) */
router.get("/upload", (req, res) => {
  res.send("Upload route working");
});

/* ✅ ACTUAL CSV UPLOAD ROUTE (POST) */
router.post("/upload", upload.single("file"), (req, res) => {
  const transactions = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (row) => {
      const amount = Math.abs(Number(row.amount));

      transactions.push({
        date: new Date(row.date),
        description: row.description,
        amount: amount,
        type: row.amount < 0 ? "income" : "expense",
        category: "UPI"
      });
    })
    .on("end", async () => {
      // await Transaction.insertMany(transactions);
      await Transaction.deleteMany({});
      await Transaction.insertMany(transactions);

      res.json({ message: "CSV uploaded & transactions saved" });
    });
});

module.exports = router;

