// app.js

const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require("body-parser");
const cors = require('cors');
const PORT = process.env.PORT || 8089;

// routes
const books = require('./routes/api/books');
app.use('/api/books', books);

const app = express();

// cors
app.use(cors());
const path = require("path");


// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {

  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// Connect Database
connectDB();




app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use Routes


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));