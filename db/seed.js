const Tip = require("./tips");
const tipList = require("./tips.json");

Tip.remove({})
  .then(() => {
    return Tip.collection.insert(tipList);
  })
  .then(() => {
    process.exit();
  });
