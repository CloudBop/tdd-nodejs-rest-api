const TodoController = require("../../controllers/todo.controller");
const TodoModel = require("../../model/todo.model");
const httpMocks = require('node-mocks-http');
const newTodo = require('../mock-data/newTodo.json');
// mock implementation
TodoModel.create = jest.fn();
//
describe("TodoController.createTodo", () => {
  it("should have a createTodo function", () => {
    expect(typeof TodoController.createTodo).toBe("function");
  });
  it("should invoke TodoModel.create() with arguments", () => {
    //
    let req,res,next;
    // mock http requests
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;

    //
    req.body = newTodo;

    //
    TodoController.createTodo(req,res,next);
    expect(TodoModel.create).toBeCalledWith(newTodo);
  });


});