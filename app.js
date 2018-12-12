require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const mongoose     = require('mongoose');
const socketIo     = require("socket.io");
const axios        = require("axios");


const logger       = require('morgan');
const path         = require('path');
const cors         = require('cors');
const session      = require('express-session');
const MongoStore   = require('connect-mongo')(session);
const passport     = require('passport');
const moment       = require('moment');

require("./config/passport-setup.js")

mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
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

app.use(session({
  secret : process.env.SESSION_PROCESS,
  resave : "",
  saveUninitialized : true,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(passport.initialize());
app.use(passport.session());

const houseRouter = require("./routes/house-router.js")
app.use('/api', houseRouter)

const authRouter = require("./routes/auth-router.js")
app.use('/api', authRouter)

const calendarRouter = require("./routes/calendar-router.js")
app.use('/api', calendarRouter)

const userRouter = require("./routes/user-router.js")
app.use('/api', userRouter)

const messageRouter = require("./routes/message-router")
app.use('/api', messageRouter)

const fileRouter = require("./routes/file-router");
app.use('/api', fileRouter);

module.exports = app;
