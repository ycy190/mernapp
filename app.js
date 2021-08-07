// app.js

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const PORT = process.env.PORT || 8089;

// routes
const books = require('./routes/api/books');

const app = express();


const path = require("path");
app.use((req, res, next) => {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next(); 

});
// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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