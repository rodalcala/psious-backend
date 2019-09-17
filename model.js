const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  owner: String,
  text: String,
  priority: Number,
  completed: Boolean,
  created_at: Date,
});

const Item = mongoose.model('items', itemSchema);

module.exports = Item;
