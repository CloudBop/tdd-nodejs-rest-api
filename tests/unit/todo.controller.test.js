const TodoController = require("../../controllers/todo.controller");
const TodoModel = require("../../model/todo.model");
const httpMocks = require('node-mocks-http');
const newTodo = require('../mock-data/newTodo.json');
const allTodos = require('../mock-data/allTodos.json');
// mock implementation
TodoModel.create = jest.fn();
TodoModel.find = jest.fn();
TodoModel.findById = jest.fn();
TodoModel.findByIdAndUpdate = jest.fn();
// global scope
let req,res,next;
let todoId = "6078c2a26a544632e6a19d78"
//
beforeEach(()=>{
  //
  // mock http requests
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();

  // for handling error 
  next = jest.fn();
})

describe("TodoController.updateTodo", () => {
  it("should have a updateTodo fn",()=>{
    expect(typeof TodoController.updateTodo).toBe("function");
  })
  it("should invoke TodoModel.findByIdAndUpdate with route params", async () => {
    //
    req.params.todoId= todoId;
    req.body = newTodo;
    await TodoController.updateTodo(req,res,next);
    expect(TodoModel.findByIdAndUpdate).toBeCalledWith(todoId, newTodo, {
      new: true,
      useFindAndModify: false
    });
  });
  it("should return json body and response 200", async ()=>{
    TodoModel.findByIdAndUpdate.mockReturnValue(newTodo)

    await TodoController.getTodoById(req,res,next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newTodo);
    expect(res._isEndCalled()).toBeTruthy();
  })
  
})
describe("TodoController.getTodoById", () => {
  it("should have a getTodoById fn",()=>{
    expect(typeof TodoController.getTodoById).toBe("function");
  })
  it("should invoke TodoModel.findById with route params", async () => {
    //
    req.params.todoId= todoId;
    await TodoController.getTodoById(req,res,next);
    
    expect(TodoModel.findById).toBeCalledWith(todoId);
  });
  it("should return json body and response 200", async ()=>{
    TodoModel.findById.mockReturnValue(newTodo)

    await TodoController.getTodoById(req,res,next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newTodo);
    expect(res._isEndCalled()).toBeTruthy();
  })
  it("should handle error or app will break", async () => {
    const errorMessage = {message: "error finding todo"};
    const rejectedPromise = Promise.reject(errorMessage)
    TodoModel.findById.mockReturnValue(rejectedPromise);
    // 
    await TodoController.getTodoById(req, res, next);
    expect(next).toBeCalledWith(errorMessage)
  });
  it("should return 404 if todo doesn't exist", async ()=>{
    TodoModel.findById.mockReturnValue(null);
    await TodoController.getTodoById(req,res,next);
    
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
    
  })
})
describe("TodoController.getTodos", () => {
  //getTodos
  it("should have a getTodos function", () => {
    expect(typeof TodoController.getTodos).toBe("function");
  });
  it("should invoke TodoModel.find({})", async () => {
    //
    await TodoController.getTodos(req,res,next);
    expect(TodoModel.find).toBeCalledWith({});
  });
  it("should return response status 200 & all todos", async ()=>{
    TodoModel.find.mockReturnValue(allTodos)
    await TodoController.getTodos(req,res,next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(allTodos);
  })
  it("should handle error in getTodos or app will break", async () => {
    const errorMessage = {message: "something went wrong"};
    const rejectedPromise = Promise.reject(errorMessage)
    TodoModel.find.mockReturnValue(rejectedPromise);
    // 
    await TodoController.getTodos(req, res, next);
    expect(next).toBeCalledWith(errorMessage)
  });
})

//
describe("TodoController.createTodo", () => {
  
  beforeEach(()=>{
    //
    req.body = newTodo;
  })
  
  it("should have a createTodo function", () => {
    expect(typeof TodoController.createTodo).toBe("function");
  });
  it("should invoke TodoModel.create() with arguments", () => {
    //
    TodoController.createTodo(req,res,next);
    expect(TodoModel.create).toBeCalledWith(newTodo);
  });
  it("should return 201 response code", async  () => {
    await TodoController.createTodo(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it("should return json body in response", async () => {
    
    TodoModel.create.mockReturnValue(newTodo);
    await TodoController.createTodo(req, res, next);
    expect( 
      // short-hand for JSON.parse( response._getData() ); - https://www.npmjs.com/package/node-mocks-http
      res._getJSONData()
      // same values, different obj in memory
    ).toStrictEqual(newTodo);
  });


  it("should handle error or app will break", async () => {
    const errorMessage = {message: "Done property missing"};
    const rejectedPromise = Promise.reject(errorMessage)
    TodoModel.create.mockReturnValue(rejectedPromise);
    // 
    await TodoController.createTodo(req, res, next);
    expect(next).toBeCalledWith(errorMessage)
  });


});