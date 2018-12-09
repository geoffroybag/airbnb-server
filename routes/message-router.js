const express = require("express");
const User = require("../models/user-model");
const Message = require("../models/message-model");

const router = express.Router();
// const io = require("socket.io")(http);

router.post("/message", (req, res, next) => {
  const {message, recipient} = req.body
  // id of the message
  Message.create({ message, recipient, sender  : req.user._id})
  .then(messageDoc => res.json(messageDoc))
  .catch(err => next(err))
});

router.get('/all-messages', (req,res,next)=>{
  Message.find({sender : {$eq : req.user._id}})
  .then(messageDoc => res.json(messageDoc))
  .catch(err => next(err))
})
// io.on("connection", function(socket){
//   console.log("A user connected")
// });

module.exports = router;