const express = require("express");
const User = require("../models/user-model");
const Message = require("../models/message-model");

const router = express.Router();
// const io = require("socket.io")(http);

router.post("/message", (req, res, next) => {
  const {message} = req.body;
  // id of the message
  Message.create({ message })
  .then(messageDoc => res.json(messageDoc))
  .catch(err => next(err))
});

router.get('/all-messages', (req,res,next)=>{
  Message.find({sender : {$eq : req.user._id}})
  .populate("sender")
  .then(messageDoc => res.json(messageDoc))
  .catch(err => next(err))
})
// io.on("connection", function(socket){
//   console.log("A user connected")
// });

module.exports = router;