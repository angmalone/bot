const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const methodOverride = require("method-override");
const Tip = require("./db/tips.js");

const app = express();
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cors());

app.get("/api/tips", (req, res) => {
  Tip.find()
    .then(tips => {
      res.json(tips);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("api/tips/:id", (req, res) => {
  Tip.findOne({ _id: req.params.id })
    .then(tips => {
      res.json(tips);
    })
    .catch(err => {
      console.log(err);
    });
});

app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), () => {
  console.log(`WE KNUCKIN AND BUCKIN ON PORT ${app.get("port")} 👊`);
});
