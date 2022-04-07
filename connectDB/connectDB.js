const mongoose = require("mongoose");

const conectToDb = async (url) => {
  return mongoose.connect(url);
};

module.exports = conectToDb;
