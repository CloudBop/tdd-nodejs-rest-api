const request = require('supertest');
const app = require('../../app');
const newTodo = require('../mock-data/newTodo.json');
const endpointUrl = "/todos/"

describe(`${endpointUrl}`, ()=>{
  it(`POST ${endpointUrl}`, async () => {
    //
    const response = await request(app).post(endpointUrl).send(newTodo);
    console.log(`response`, JSON.stringify(response.body))
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.done).toBe(newTodo.done);
  })
})