const mongoose = require("mongoose");
const boardSchema = mongoose.Schema({
  name: { type: String, require: true },
  tasks: [
    {
      title: String,
      description: String,
      status: String,
      subtask: [{ title: String, isCompleted: Boolean }],
    },
  ],
});

const boardModel = mongoose.model("blog", boardSchema);

module.exports = { boardModel };
