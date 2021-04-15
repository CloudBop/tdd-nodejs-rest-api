const express = require("express");
const app = express();

app.get("/", (req, res) => {
  // || res.send for templating
  res.json("Hello world!"); // for REST api 
});

app.listen(3000, () => {
  console.log("Server is now running!");
});

module.exports = app;