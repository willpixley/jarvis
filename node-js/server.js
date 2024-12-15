// server.js

const express = require('express');
const cors = require('cors');
require('dotenv').config(); // To load environment variables from a .env file

const app = express();

// Middleware setup
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // To parse JSON request bodies

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Example API route
app.get('/api/data', (req, res) => {
  res.json({
    message: 'This is some data',
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
