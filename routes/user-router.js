const express = require("express");
const User = require("../models/user-model.js");

const router = express.Router();

router.put("/favorites/:id", (req,res,next)=>{
  const {id} = req.params
  User.findByIdAndUpdate(
    req.user._id,
    {$push : {favorites : {houses : id}}},
    {runValidators: true, new: true},
  )
  .then(currentUser => res.json(currentUser))
  .catch(err=>next(err))
})

router.put("/favorites/:id/delete", (req,res,next)=>{
  const {id} = req.params
  User.findByIdAndUpdate(
    req.user._id,
    {$pull : {favorites : {houses : id}}},
    {runValidators: true, new: true},
  )
  .then(currentUser => res.json(currentUser))
  .catch(err=>next(err))
})

router.get("/favorites-list", (req,res,next)=>{
  console.log("FAV LIST REQ USER TEST",req.user._id)
  User.findOne(req.user._id)
  .populate("favorites.houses")
  .sort({ createdAt: -1 })
  .then(currentUser => res.json(currentUser))
  .catch(err=>next(err))
})

module.exports = router;