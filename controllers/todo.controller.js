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

  try {
    const todo = await TodoModel.findById(req.params.todoId);

    if(todo){
       res.status(200).json(todo);
    }else {
      //  res.status(404).json(null); - works too
      res.status(404).send();
    }



  } catch (error) {
    next(error)
  }
}

exports.updateTodo = async (req,res,next)=>{}