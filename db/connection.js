const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;

if (process.env.NODE_ENV == "production") {
  MongoClient.connect(
    process.env.MLAB_URL,
    { useNewUrlParser: true }
  );
} else {
  MongoClient.connect(
    "mongodb://localhost/api-tips",
    { useNewUrlParser: true }
  );
}
mongoose.Promise = Promise;
module.exports = mongoose;
