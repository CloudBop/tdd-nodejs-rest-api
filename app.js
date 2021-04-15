const express = require("express");
const todoRoutes = require('./routes/todo.routes')
const app = express();
const mongodb = require("./mongodb/mongodb.connect");
mongodb.connect();

// middleware - tell express to respond with json
app.use(express.json())
// middleware - get, post, put
app.use("/todos", todoRoutes);
// 
app.use((error,req,res,next)=>{
  //invoked in the next callback
  res.status(500).json({message:error.message})
})

app.get("/", (req, res) => {
  // || res.send for templating
  res.json("Hello world!"); // for REST api 
});

module.exports = app;