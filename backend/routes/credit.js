const express = require("express");
const Transaction = require("../models/Transaction");

const router = express.Router();

router.get("/credit", async (req, res) => {
  try {
    const transactions = await Transaction.find();

    let income = 0;
    let expense = 0;

    transactions.forEach(t => {
      if (t.type === "income") income += t.amount;
      else expense += t.amount;
    });

    // Simulated credit assumptions
    const creditLimit = 50000;
    const monthlyEMI = 8000;

    const creditUtilization = Math.round((monthlyEMI / income) * 100);

    let status = "Good";
    if (creditUtilization > 50) status = "Risky";
    else if (creditUtilization > 30) status = "Warning";

    res.json({
      creditLimit,
      monthlyEMI,
      income,
      creditUtilization,
      status
    });
  } catch (err) {
    res.status(500).json({ error: "Credit visibility failed" });
  }
});

module.exports = router;
