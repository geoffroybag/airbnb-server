const express = require("express");
const House = require("../models/house-model.js");

const User = require("../models/user-model.js");
const Booking = require("../models/booking-model.js");

const router = express.Router();

router.get("/houses", (req, res, next)=>{
  House.find()
  .sort({createdAt : -1})
    // .limit(99)
    // send the query results as a JSON response to the client
    .then(houseResults => res.json(houseResults))
    .catch(err => next(err));
  })

// Create a house when the become a host form is submitted
router.post("/houses", (req, res, next) => {
  const { property_type, room_type, accommodates, beds, bedrooms, bathrooms, neighbourhood, amenities, name, description, country, city, price, xl_picture_url, xl_picture_url_2, xl_picture_url_3, host_picture_url, owner, availableDates } = req.body;
  const recordid = Math.floor(Math.random()*1000000000000)
  House.create({ recordid, property_type, room_type, accommodates, beds, bedrooms, bathrooms, neighbourhood, amenities, name, description, country, city, price, xl_picture_url, xl_picture_url_2, xl_picture_url_3, host_picture_url, owner, availableDates })
  .then(houseDoc => res.json(houseDoc))
  .catch(err => next(err))
})

// Get the house fields
router.get("/houses/:id", (req,res,next) => {
  const {id} = req.params;
  
  House.findById(id)
  .populate('owner')
  .then(houseDoc => res.json(houseDoc))
  .catch(err=>next(err))
})

// router.get("/search/:where", (req,res,next)=>{
//   const {where} = req.params
//   console.log(req.params)
//   House.find({"city" : {$eq : where}})
//   .then(houseDoc => res.json(houseDoc))
//   .catch(err=>next(err))
// })

router.post("/search", (req, res, next) => {
  const { arrayOfDates, where, guest } = req.body;
  House.find( {"city" : {$eq : where}, availableDates: {$all : arrayOfDates}, accommodates : {$gte : guest} })
  .then(houseDoc => {
      res.json(houseDoc)
  })
  .catch(err => next(err));
});



// Get the houses that matches the user email then render it in the UserHouses component
router.get("/userhouses", (req, res, next) => {

  House.find({"owner" : {$eq: req.user._id}})
  .then(houseDoc => res.json(houseDoc))
  .catch(err => next(err));
})

// Delete a house
router.delete("/deletehouse/:id", (req, res, next) => {
  const { id } = req.params;

  House.findByIdAndRemove(id)
  .then(houseDoc => {
    res.send(houseDoc)
  })
  .catch(err => next(err));
})

// Edit a house - Form in the EditPlace component
router.put("/houses/:id", (req, res, next) => {
  const { id } = req.params;
  const { property_type, room_type, accommodates, beds, bedrooms, bathrooms, neighbourhood, amenities, name, description, country, city, price, xl_picture_url, xl_picture_url_2, xl_picture_url_3 } = req.body;

  House.findByIdAndUpdate(id, { $set: { property_type, room_type, accommodates, beds, bedrooms, bathrooms, neighbourhood, amenities, name, description, country, city, price, xl_picture_url, xl_picture_url_2, xl_picture_url_3 } }, { runValidators: true, new: true })
  .then(houseDoc => {
    res.send(houseDoc)
  })
  .catch(err => {
    console.log("Something went wrong", err);
  })
})



router.post("/booking/:houseId", (req, res, next) => {
  const { arrayOfDates, where, guests, price } = req.body;
  const { houseId } = req.params;
  Booking.create({ arrayOfDates, guests , houseId, price, houseId})
    .then(userDoc => {
        res.json(userDoc)
      })
    .catch(err => next(err));
});

router.get("/bookings-list", (req,res,next)=>{
  Booking.find()
  .populate("houseId")
  .sort({ createdAt: -1 })
  .then(currentUser => res.json(currentUser))
  .catch(err=>next(err))
})













module.exports = router;
