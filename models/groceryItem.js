const mongoose = require('mongoose');

const GroceryItemSchema = new mongoose.Schema({
  name: String,
  quantity: String,
});

module.exports = mongoose.model('GroceryItem', GroceryItemSchema);
