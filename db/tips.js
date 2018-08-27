const mongoose = require("../db/connection");

const TipSchema = new mongoose.Schema({
  tip: String,
  number: Number
});

const Tip = mongoose.model("Tip", TipSchema);

module.exports = Tip;
