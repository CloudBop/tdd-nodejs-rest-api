const express = require("express");
const todoRoutes = require('./routes/todo.routes')
const app = express();

// middleware - tell express to respond with json
app.use(express.json())
// middleware - get, post, put
app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
  // || res.send for templating
  res.json("Hello world!"); // for REST api 
});

module.exports = app;