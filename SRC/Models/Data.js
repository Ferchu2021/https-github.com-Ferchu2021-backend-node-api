const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  nombre: String
});

module.exports = mongoose.model("Data", DataSchema);
