const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  message: {
    type: String,
    required: true
  }
});

// Create model
const Todo = mongoose.model("todo", TodoSchema);

//Export model
module.exports = Todo;
