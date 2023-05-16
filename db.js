const mongoose = require("mongoose");
const connection = mongoose.connect(
  "mongodb+srv://yash10072000:sharma@cluster0.rw2l1xp.mongodb.net/mock15"
);

module.exports = { connection };
