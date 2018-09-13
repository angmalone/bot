const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const methodOverride = require("method-override");
const Tip = require("./db/tips.js");
const path = require("path");
const hbs = require("hbs");

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cors());

//UI

app.get("/", (req, res) => {
  Tip.find({}).then(tips => {
    res.render("tips/index", { tips });
  });
});

app.get("/tips/new", (req, res) => {
  res.render("tips/new");
});

app.get("/tips/:id", (req, res) => {
  Tip.findOne({ _id: req.params.id }).then(tips => {
    res.render("tips/show", tips);
  });
});

app.get("/tips/edit/:id", (req, res) => {
  Tip.findOne({ _id: req.params.id }).then(tips => {
    res.render("tips/edit", tips);
  });
});

app.put("/:id", (req, res) => {
  Tip.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).then(
    tips => {
      res.redirect("/tips");
    }
  );
});

app.delete("/:id", (req, res) => {
  Tip.findOneAndRemove({ _id: req.params.id }).then(() => {
    res.redirect("/tips");
  });
});

app.post("/api/tips", (req, res) => {
  Tip.create({
    tip: req.body.tip
  }).then(tips => {
    res.redirect("/");
  });
});

//API

app.get("/api/tips", (req, res) => {
  Tip.find()
    .then(tips => {
      res.json(tips);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/api/tips/:id", (req, res) => {
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
