const TodoModel = require('../model/todo.model')

// TODO - Connect to MongoDB.

// BUG:WARN - ASYNC/AWAIT.  Promise based - Think implementation
exports.createTodo = async (req,res,next) => {

  try {
    const createdModel = await TodoModel.create(req.body);
    // 201 is for data created on server correctly
    res.status(201).json(createdModel);
  } catch (error) {
    next(error)
  }
}

exports.getTodos = async (req,res,next) => {

  try {
    //returns all 
    const allTodos = await TodoModel.find({});
    res.status(200).json(allTodos)
  } catch (error) {
    next(error)
  }
}

exports.getTodoById = async (req,res,next) => {

  
}