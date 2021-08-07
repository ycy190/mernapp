// app.js

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const PORT = process.env.PORT || 8089;

// routes
const books = require('./routes/api/books');

const app = express();

// cors
app.use(cors());
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

  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// Connect Database
connectDB();




app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use Routes
app.use('/api/books', books);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));