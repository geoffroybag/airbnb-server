require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors         = require('cors');


mongoose
  .connect('mongodb://localhost/airbnb-server', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Allow Cross-Origin Resource Sharing (CORS)
// (allows access to the API from the frontend JS on a different domain/origin)
app.use(cors({
  credentials : true, 
  origin : ['http://localhost:3000']
  }
))

const houseRouter = require("./routes/house-router.js")

app.use('/api', houseRouter)

module.exports = app;
