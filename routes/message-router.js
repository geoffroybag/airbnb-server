const express = require("express");
const User = require("../models/user-model");
const Message = require("../models/message-model");

const router = express.Router();
// const io = require("socket.io")(http);


router.post("/message", (req, res, next) => {
  const {message} = req.body;
  // id of the message
  Message.create({ 
    message : {guestMessage: message}, 
    recipient : recipient,
    sender  : req.user._id
    })
  .then(messageDoc => res.json(messageDoc))
  .catch(err => next(err))
});


router.post("/new-message-guest/:id", (req, res, next) => {
  const {id} = req.params
  const {message} = req.body
  // id of the message
  Message.findByIdAndUpdate(
    id,
    {$push : {message : {guestMessage : message}}},
    {runValidators: true, new: true},
  )
  .then(currentUser => res.json(currentUser))
  .catch(err=>next(err))
})

router.post("/new-message-host/:id", (req, res, next) => {
  const {id} = req.params
  const {message} = req.body
  // id of the message
  Message.findByIdAndUpdate(
    id,
    {$push : {message : {hostMessage : message}}},
    {runValidators: true, new: true},
  )
  .then(currentUser => res.json(currentUser))
  .catch(err=>next(err))
})

router.get("/message/:id", (req, res, next) => {
  const {id} = req.params
  console.log(id)
  Message.findById(
    id
  )
  .populate("sender")
  .populate("recipient")
  .then(currentUser => res.json(currentUser))
  .catch(err=>next(err))
});


router.get('/all-messages', (req,res,next)=>{
  Message.find(
    {$or: [{sender : {$eq : req.user._id}}, {recipient : {$eq : req.user._id}}]}
    )
  .sort({createdAt : -1})
  .populate("sender")
  .populate("recipient")
  .then(messageDoc => res.json(messageDoc))
  .catch(err => next(err))
})
// io.on("connection", function(socket){
//   console.log("A user connected")
// });

module.exports = router;