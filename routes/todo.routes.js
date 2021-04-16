const express = require('express');
const todoController = require('../controllers/todo.controller')
const router = express.Router()

router.post("/", todoController.createTodo)
router.get("/", todoController.getTodos)
// req.params.todoId
router.get("/:todoId", todoController.getTodoById)
router.put("/:todoId", todoController.updateTodo)
router.delete("/:todoId", todoController.deleteTodo)


module.exports = router