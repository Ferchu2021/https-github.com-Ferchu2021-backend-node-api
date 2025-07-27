const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true }

});

module.exports = mongoose.model("Data", DataSchema);
