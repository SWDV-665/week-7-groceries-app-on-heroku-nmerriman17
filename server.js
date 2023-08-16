const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const groceryItemsRouter = require('./models');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Port configuration
let port = process.env.PORT || 8000; // Use process.env.PORT if available, otherwise default to 8000

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose.connect('mongodb://localhost:27017/groceryListDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/api', groceryItemsRouter);
