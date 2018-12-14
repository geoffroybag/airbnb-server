const express = require("express");
const User = require("../models/user-model");
const Message = require("../models/message-model");

const router = express.Router();
// const io = require("socket.io")(http);


router.post("/message", (req, res, next) => {
  const {message, recipient, arrayOfDates, city, price} = req.body;

  User.findById(recipient._id)
    .then(recipientDoc => {
      Message.create({ 
        message : {guestMessage: message, sender : req.user, recipient: recipientDoc}, 
        recipient : recipientDoc,
        sender  : req.user,
        arrayOfDates: arrayOfDates,
        city: city,
        price: price,
        })
      .then(messageDoc => res.json(messageDoc))
      .catch(err => next(err))
    })
  .catch(err => next(err))
});


router.post("/new-message-guest/:id", (req, res, next) => {
  const {id} = req.params
  const {message, recipient} = req.body
  // id of the message
  Message.findByIdAndUpdate(
    id,
    {$push : {message : {guestMessage : message, sender : req.user._id, recipient : recipient._id}}},
    {runValidators: true, new: true},
  )
  .populate("message.sender")
  .populate("message.recipient")
  .then(currentUser => res.json(currentUser))
  .catch(err=>next(err))
})

router.post("/new-message-host/:id", (req, res, next) => {
  const {id} = req.params
  const {message, sender, recipient} = req.body
  // id of the message
  Message.findByIdAndUpdate(
    id,
    {$push : {message : {hostMessage : message, sender : req.user._id, recipient : sender._id}}},
    {runValidators: true, new: true},
  )
  .populate("message.sender")
  .populate("message.recipient")
  .then(currentUser => res.json(currentUser))
  .catch(err=>next(err))
})

router.get("/message/:id", (req, res, next) => {
  const {id} = req.params
  console.log(id)
  Message.findById(id)
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

module.exports = router;