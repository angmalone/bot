const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const methodOverride = require("method-override");
const Tip = require("./db/tips.js");
const hbs = require("hbs");
const db = require("./db/tips.json");

const app = express();
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(cors());

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

app.get("/api/tips/notused", (req, res) => {
  Tip.find({ beenUsed: false })
    .then(Tip.aggregate([{ $sample: { size: 1 } }]))
    .then(tips => {
      res.json(tips);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/api/tips/alreadyused", (req, res) => {
  Tip.find({ beenUsed: true })
    .then(tips => {
      res.json(tips);
    })
    .catch(err => {
      console.log(err);
    });
});

///

/*app.get("/api/tips/random", (req, res) => {
  Tip.updateMany({}, { $set: { beenUsed: false } })
    .then(
      Tip.aggregate([{ $match: { beenUsed: false } }, { $sample: { size: 1 } }])
    )
    .then(tips => {
      res.json(tips);
    })
    .catch(err => {
      console.log(err);
    });
});*/

app.get("/api/tips/random", (req, res) => {
  Tip.aggregate([
    { $match: { beenUsed: false } },
    { $sample: { size: 1 } }
  ]).then(tips => {
    if (tips == !undefined) {
      Tip.aggregate([{ $match: { beenUsed: false } }, { $sample: { size: 1 } }])
        .then(tips => {
          res.json(tips);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      Tip.updateMany({}, { $set: { beenUsed: false } }).then(
        Tip.aggregate([
          { $match: { beenUsed: false } },
          { $sample: { size: 1 } }
        ])
          .then(tips => {
            res.json(tips);
          })
          .then(tips => {
            res.json(tips);
          })
          .catch(err => {
            console.log(err);
            process.exit();
          })
      );
    }
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

app.post("/api/tips", (req, res) => {
  Tip.create({
    tip: req.body.tip
  }).then(tips => {
    res.redirect("/api/tips");
  });
});

app.put("/api/tips/:id", (req, res) => {
  Tip.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).then(
    {}
  );
});

app.delete("/api/tips/:id", (req, res) => {
  Tip.findOneAndRemove({ _id: req.params.id }).then(() => {});
});

app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), () => {
  console.log(`✅ PORT: ${app.get("port")} 🌟`);
});
