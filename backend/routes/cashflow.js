const express = require("express");
const Transaction = require("../models/Transaction");

const router = express.Router();

router.get("/cashflow", async (req, res) => {
  try {
    const transactions = await Transaction.find();

    let income = 0;
    let expense = 0;

    transactions.forEach(t => {
      if (t.type === "income") income += t.amount;
      else expense += t.amount;
    });

    res.json({
      income,
      expense,
      balance: income - expense
    });
  } catch (err) {
    res.status(500).json({ error: "Cashflow calculation failed" });
  }
});

module.exports = router;
