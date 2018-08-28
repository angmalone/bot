const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;

if (process.env.NODE_ENV == "production") {
  mongoose.connect(
    process.env.MLAB_URL,
    { useNewUrlParser: true }
  );
} else {
  mongoose.connect(
    "mongodb://localhost/api-tips",
    { useNewUrlParser: true }
  );
}

mongoose.Promise = Promise;

module.exports = mongoose;
