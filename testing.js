app.get("/api/tips/random", (req, res) => {
  Tip.aggregate([
    { $match: { beenUsed: false } },
    { $sample: { size: 1 } }
  ]).then(res => {
    if (res.data === undefined) {
      Tip.update({}, { $set: { beenUsed: false } }).then(
        Tip.aggregate([
          { $match: { beenUsed: false } },
          { $sample: { size: 1 } }
        ])
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
});

////
//THIS ONE WORKS
app.get("/api/tips/random", (req, res) => {
  Tip.aggregate([{ $match: { beenUsed: false } }, { $sample: { size: 1 } }])
    .then(tips => {
      res.json(tips);
    })
    .catch(err => {
      console.log(err);
    });
});

//

app.get("/api/tips/random", (req, res) => {
  Tip.aggregate([
    { $match: { beenUsed: false } },
    { $sample: { size: 1 } }
  ]).then(res => {
    if (res.data == !undefined) {
      Tip.aggregate([{ $match: { beenUsed: false } }, { $sample: { size: 1 } }])
        .then(tips => {
          res.json(tips);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      Tip.updateMany({}, { $set: { beenUsed: false } })
        .then(
          Tip.aggregate([
            { $match: { beenUsed: false } },
            { $sample: { size: 1 } }
          ])
        )
        .then(tips => {
          res.json(tips);
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
});

//

app.get("/api/tips/random", (req, res) => {
  Tip.aggregate([
    { $match: { beenUsed: false } },
    { $sample: { size: 1 } }
  ]).then(res => {
    if (res.data == !undefined) {
      (tips => {
        res.json(tips);
      }).catch(err => {
        console.log(err);
      });
    } else {
      Tip.updateMany({}, { $set: { beenUsed: false } })
        .then(
          Tip.aggregate([
            { $match: { beenUsed: false } },
            { $sample: { size: 1 } }
          ])
        )
        .then(tips => {
          res.json(tips);
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
});
