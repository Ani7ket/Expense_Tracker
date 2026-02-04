const express = require("express");
const Transaction = require("../models/Transaction");

const router = express.Router();

/* 🔹 Simple rule-based categorization */
const getCategory = (description) => {
  const d = description.toLowerCase();

  if (d.includes("zomato") || d.includes("swiggy") || d.includes("food"))
    return "Food";
  if (d.includes("uber") || d.includes("ola") || d.includes("travel"))
    return "Travel";
  if (d.includes("netflix") || d.includes("amazon prime"))
    return "Entertainment";
  if (d.includes("electricity") || d.includes("bill") || d.includes("recharge"))
    return "Bills";
  if (d.includes("amazon") || d.includes("flipkart") || d.includes("shopping"))
    return "Shopping";

  return "Others";
};

router.get("/expenses-by-category", async (req, res) => {
  try {
    const transactions = await Transaction.find({ type: "expense" });

    const summary = {};

    transactions.forEach(t => {
      const category = getCategory(t.description);
      summary[category] = (summary[category] || 0) + t.amount;
    });

    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: "Expense categorization failed" });
  }
});

module.exports = router;
