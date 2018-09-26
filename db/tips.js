const mongoose = require("../db/connection");

const TipSchema = new mongoose.Schema({
  tip: String,
  beenUsed: Boolean
});

const Tip = mongoose.model("Tip", TipSchema);

module.exports = Tip;
