// const express = require("express");
// const User = require("../models/user-model");
// const Message = require("../models/message-model");

// const router = express.Router();
// const io = require("socket.io")(http);

// //GET THE ID OF THE USER

// router.post("/chat", (req, res, next) => {

//   // id of the message
//   Message.findOne()
//   .then(messageDoc => {
//     res.json(messageDoc.data)
//   })
//   .catch(err => next(err));
// });

// io.on("connection", function(socket){
//   console.log("A user connected")
// });

// module.exports = router;