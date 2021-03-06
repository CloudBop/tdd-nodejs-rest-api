const request = require('supertest');
const app = require('../../app');
const newTodo = require('../mock-data/newTodo.json');
const endpointUrl = "/todos/"
let firstTodo, newTodoId;
const noneExistId = "6078c2a26a544632e6a19000"
const testData = {title: "Make integration test for PUT", done:true}
describe(`${endpointUrl}`, ()=>{
  it(`GET ${endpointUrl}`, async () => {
    //
    const response = await request(app).get(endpointUrl);
    expect(response.statusCode).toBe(200);
    // TODO findout why this won't work, recieves 'object' - expect(typeof response.body).toBe("array");
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(typeof response.body[0].title).toBeDefined();
    expect(typeof response.body[0].done).toBeDefined();
    
    firstTodo = response.body[0];
  })
  it(`GET ${endpointUrl}:todoId`, async () => {
    const response = await request(app).get(endpointUrl+firstTodo._id)
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(firstTodo.title)
    expect(response.body.body).toBe(firstTodo.body)
  })
  it(`GET ${endpointUrl}:todoId ID does not exist`, async () => {
    // Has to be valid ID but ! in use in db
    const response = await request(app).get(endpointUrl+noneExistId)
    expect(response.statusCode).toBe(404);
  })
  it(`POST ${endpointUrl}`, async () => {
    //
    const response = await request(app).post(endpointUrl).send(newTodo);
    
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.done).toBe(newTodo.done);
    newTodoId = response.body._id
  })
  it(`should 500 on malformed req data POST as json !html ${endpointUrl}`, async () => {
    //
    const response = await request(app).post(endpointUrl).send({title:"Missing done property"});
    
    expect(response.statusCode).toBe(500);
    // 
    expect(response.body).toStrictEqual({
        "message": "Todo validation failed: done: Path `done` is required."
    })
  })
  it(`PUT${endpointUrl} should updateTodo`, async ()=>{
    
    // 
    const response = await request(app).put(endpointUrl+newTodoId).send(testData);
    expect(response.statusCode).toBe(200);
    // 
    expect(response.body.title).toBe(testData.title);
    expect(response.body.done).toBe(testData.done);
  })
  it(`PUT ${endpointUrl}:todoId ID does not exist`, async () => {
    // Has to be valid ID but ! in use in db
    const response = await request(app).get(endpointUrl+noneExistId)
    expect(response.statusCode).toBe(404);
  })

  it(`Delete${endpointUrl} should deleteTodo`, async ()=>{
    // 
    const response = await request(app).delete(endpointUrl+newTodoId).send();
    expect(response.statusCode).toBe(200);
    // 
    expect(response.body.title).toBe(testData.title);
    expect(response.body.done).toBe(testData.done);
  })

  it(`Delete${endpointUrl} should 404`, async ()=>{
    // 
    const response = await request(app).delete(endpointUrl+noneExistId).send();
    expect(response.statusCode).toBe(404);
  })
  
})