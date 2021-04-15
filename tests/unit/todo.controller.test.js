const TodoController = require("../../controllers/todo.controller");
const TodoModel = require("../../model/todo.model");

// mock implementation
TodoModel.create = jest.fn();
//
describe("TodoController.createTodo", () => {
  it("should have a createTodo function", () => {
    expect(typeof TodoController.createTodo).toBe("function");
  });
  it("should invoke TodoModel.create()", () => {
    
    TodoController.createTodo();
    expect(TodoModel.create).toBeCalled();
  });


});