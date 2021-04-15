const TodoController = require("../../controllers/todo.controller");
const TodoModel = require("../../model/todo.model");
const httpMocks = require('node-mocks-http');
const newTodo = require('../mock-data/newTodo.json');
// mock implementation
TodoModel.create = jest.fn();
// global scope
let req,res,next;
//
beforeEach(()=>{
  //
  // mock http requests
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
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


});