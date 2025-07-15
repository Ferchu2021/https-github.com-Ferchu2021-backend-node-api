const Data = require("../models/Data");

exports.getPublic = async (req, res) => {
  const data = await Data.find();
  res.json(data);
};

exports.getPrivate = async (req, res) => {
  const data = await Data.find();
  res.json(data);
};

exports.create = async (req, res) => {
  const dato = new Data(req.body);
  await dato.save();
  res.status(201).json(dato);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const updated = await Data.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  await Data.findByIdAndDelete(id);
  res.json({ message: "Eliminado" });
};
