const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const uploadRoute = require("./routes/upload");
const cashflowRoute = require("./routes/cashflow");
const savingsRoute = require("./routes/savings");
const categoryRoute = require("./routes/categories");
const creditRoute = require("./routes/credit");
const predictionRoute = require("./routes/prediction");




const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/flowwise")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("FlowWise API running");
});

// ✅ Upload route
app.use("/api", uploadRoute);

// ✅ Cashflow route (THIS WAS MISSING)
app.use("/api", cashflowRoute);

// ✅ Savings route (THIS WAS MISSING)
app.use("/api", savingsRoute);

// ✅ Category route (THIS WAS MISSING)
app.use("/api", categoryRoute);

// ✅ Credit route (THIS WAS MISSING)
app.use("/api", creditRoute);

// ✅ Prediction route (THIS WAS MISSING)
app.use("/api", predictionRoute);



app.listen(5000, () => {
  console.log("Server running on port 5000");
});
