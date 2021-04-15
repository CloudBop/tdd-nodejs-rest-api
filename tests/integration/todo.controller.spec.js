const request = require('supertest');
const app = require('../../app');
const newTodo = require('../mock-data/newTodo.json');
const endpointUrl = "/todos/"

describe(`${endpointUrl}`, ()=>{
  it(`GET ${endpointUrl}`, async () => {
    //
    const response = await request(app).get(endpointUrl);
    expect(response.statusCode).toBe(200);
    // TODO findout why this won't work, recieves 'object' - expect(typeof response.body).toBe("array");
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(typeof response.body[0].title).toBeDefined();
    expect(typeof response.body[0].done).toBeDefined();
  })
  it(`POST ${endpointUrl}`, async () => {
    //
    const response = await request(app).post(endpointUrl).send(newTodo);
    
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.done).toBe(newTodo.done);
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
})