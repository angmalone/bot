const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const methodOverride = require("method-override");
const Tip = require("./db/tips.js");
const path = require("path");
const hbs = require("hbs");
const db = require("./db/tips.json");
const NewTips = Tip.collection.find({ beenUsed: false });

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
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

app.get("/api/tips/random", (req, res) => {
  if (Tip.count({ beenUsed: { $eq: true } }) === Tip.count()) {
    Tip.updateMany(
      { beenUsed: true },
      {
        $set: {
          beenUsed: false
        }
      }
    ).then(
      Tip.aggregate([{ $match: { beenUsed: false } }, { $sample: { size: 1 } }])
        .then(tips => {
          res.json(tips);
        })
        .catch(err => {
          console.log(err);
        })
    );
  } else {
    Tip.aggregate([{ $match: { beenUsed: false } }, { $sample: { size: 1 } }])
      .then(tips => {
        res.json(tips);
      })
      .catch(err => {
        console.log(err);
      });
  }
});

/*CORRECT
app.get("/api/tips/random", (req, res) => {
  Tip.aggregate([{ $match: { beenUsed: false } }, { $sample: { size: 1 } }])
    .then(tips => {
      res.json(tips);
    })
    .catch(err => {
      console.log(err);
    });
});*/

app.get("/api/tips/:id", (req, res) => {
  Tip.findOne({ _id: req.params.id })
    .then(tips => {
      res.json(tips);
    })
    .catch(err => {
      console.log(err);
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
  console.log(`WE KNUCKIN AND BUCKIN ON PORT ${app.get("port")} 👊`);
});

//UI

/*app.get("/", (req, res) => {
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

app.delete("/api/tips/:id", (req, res) => {
  Tip.findOneAndRemove({ _id: req.params.id }).then(() => {
    res.redirect("/");
  });
});

app.post("/api/tips", (req, res) => {
  Tip.create({
    tip: req.body.tip
  }).then(tips => {
    res.redirect("/api/tips");
  });
});*/

///////

/*if (Tip.count({ beenUsed: { $eq: true } }) === Tip.collection.count()) {
  Tip.updateMany(
    { beenUsed: true },
    {
      $set: {
        beenUsed: false
      }
    }
  ).then(
    Tip.aggregate([{ $match: { beenUsed: false } }, { $sample: { size: 1 } }])
      .then(tips => {
        res.json(tips);
      })
      .catch(err => {
        console.log(err);
      })
  );
} else {
  Tip.aggregate([{ $match: { beenUsed: false } }, { $sample: { size: 1 } }])
    .then(tips => {
      res.json(tips);
    })
    .catch(err => {
      console.log(err);
    });
}*/

///////

/*app.get("/tips/api/random", (req, res) => {
  if (req.query.groupId == null || req.query.userId == null) {
    return res.send("Must include both groupId and userId");
  } else {
    MongoClient.connect(
      url,
      function(err, db) {
        var collection = db.collection("groups");
        collection.findOne(
          {
            _id: ObjectID(req.query.groupId),
            group_members: {
              $elemMatch: { user_id: req.query.userId }
            }
          },
          function(err, result) {
            return res.send(result != null);
          }
        );
      }
    );
  }
});*/
