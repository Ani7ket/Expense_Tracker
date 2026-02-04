const express = require("express");
const Transaction = require("../models/Transaction");

const router = express.Router();

router.get("/savings", async (req, res) => {
  try {
    const transactions = await Transaction.find();

    let income = 0;
    let expense = 0;

    transactions.forEach(t => {
      if (t.type === "income") income += t.amount;
      else expense += t.amount;
    });

    const balance = income - expense;

    let savings = 0;
    if (balance > 10000) savings = balance * 0.2;
    else if (balance > 5000) savings = balance * 0.1;

    res.json({
      balance,
      recommendedSavings: Math.round(savings)
    });
  } catch (err) {
    res.status(500).json({ error: "Savings calculation failed" });
  }
});

module.exports = router;
