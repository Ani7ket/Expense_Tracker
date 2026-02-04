const express = require("express");
const Transaction = require("../models/Transaction");

const router = express.Router();

router.get("/predict-expense", async (req, res) => {
  try {
    const expenses = await Transaction.find({ type: "expense" });

    const total = expenses.reduce((sum, t) => sum + t.amount, 0);
    const avg = Math.round(total / (expenses.length || 1));

    res.json({
      predictedNextMonthExpense: avg,
      logic: "Historical average-based prediction"
    });
  } catch (err) {
    res.status(500).json({ error: "Prediction failed" });
  }
});

module.exports = router;
