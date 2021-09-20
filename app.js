// app.js
//The process order is super super super important,
//for example has to initialize app with express first
//then introduce model and route
//then set the path for heroku accordingly and connect to db
//then create middleware
//finally listen to port

const express = require('express');
const connectDB = require('./config/db');
// Connect Database
connectDB();
const bodyParser = require("body-parser");
const cors = require('cors');
const PORT = process.env.PORT || 8082;




// routes
const books = require('./routes/api/books');

const app = express();


// cors
app.use(cors());
app.use('/api/books', books);

app.use(cors({ origin: "https://sammernapp.herokuapp.com/", credentials: true }))

const path = require("path");



app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
     next();
});
// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {

  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});


//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




app.listen(PORT, () => console.log(`Server running on port ${PORT}`));