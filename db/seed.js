const Tip = require("./tips");
const tipList = require("./tips.json");

Tip.deleteMany({})
  .then(() => {
    return Tip.collection.insertMany(tipList);
  })
  .then(() => {
    process.exit();
  });
