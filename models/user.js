const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/db')
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB not connected", err));

const userSchema = new mongoose.Schema({
  image: String,
  email: String,
  name: String
});

// Fix the export statement
module.exports = mongoose.model("user", userSchema);
