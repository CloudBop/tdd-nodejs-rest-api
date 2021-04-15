const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  title: {
    type:String,
    required: true
  },
  done: {
    type: Boolean,
    required:true
  }
});
// create Todos Model/Interface in MongoDB
const TodoModel = mongoose.model("Todo", TodoSchema)

module.exports = TodoModel