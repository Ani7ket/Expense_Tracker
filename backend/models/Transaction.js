const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  date: Date,
  description: String,
  amount: Number,
  type: String,      // income / expense
  category: String  // UPI / Food / Travel etc.
});

module.exports = mongoose.model("Transaction", TransactionSchema);
