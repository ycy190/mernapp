// app.js

const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');
const PORT = process.env.PORT || 8089;

// routes
const books = require('./routes/api/books');

const app = express();


const path = require("path");

// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// Connect Database
connectDB();

// cors
app.use(cors());

// Init Middleware
app.use(express.json({ extended: false }));


// use Routes
app.use('/api/books', books);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));