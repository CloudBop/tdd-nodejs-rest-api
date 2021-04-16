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
// create todos Model/Interface in MongoDB EG clustername->todos 
const TodoModel = mongoose.model("Todo", TodoSchema)

module.exports = TodoModel