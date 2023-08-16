const express = require('express');
const router = express.Router();
const GroceryItem = require('../models/GroceryItem');

// Define your routes here
router.get('/groceryItem', async (req, res) => {
  try {
    const items = await GroceryItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/groceryItem', async (req, res) => {
  const item = new GroceryItem({
    name: req.body.name,
    quantity: req.body.quantity,
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Export the router
module.exports = router;
