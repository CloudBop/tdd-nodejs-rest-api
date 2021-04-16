const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      // WARNING: NEED TO SETUP MONGODB USER+PW
      "mongodb+srv://test-user:testuser1@cluster0.uhfgl.mongodb.net/tdd-node?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  } catch (err) {
    console.error("Error connecting to mongodb");
    console.error(err);
  }
}

module.exports = { connect };