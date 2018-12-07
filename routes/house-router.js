const express = require("express");
const House = require("../models/house-model.js");

const User = require("../models/user-model.js");

const router = express.Router();

router.get("/houses", (req, res, next)=>{
  House.find()
    // .limit(99)
    // send the query results as a JSON response to the client
    .then(houseResults => res.json(houseResults))
    .catch(err => next(err));
  })

router.post("/houses", (req, res, next) => {
  const { property_type, room_type, accomodates, beds, bedrooms, bathrooms, neighbourhood, amenities, title, description, country, city, price, picture_url, owner } = req.body;
  const recordid = Math.floor(Math.random()*1000000000000)
  House.create({ recordid, property_type, room_type, accomodates, beds, bedrooms, bathrooms, neighbourhood, amenities, title, description, country, city, price, picture_url, owner })
  .then(houseDoc => res.json(houseDoc))
  .catch(err => next(err))
})

router.get("/houses/:id", (req,res,next) => {
  const {id} = req.params
  House.findById(id)
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
  const { arrayOfDates, where,  } = req.body;
  House.find( {"city" : {$eq : where}, availableDates: {$all : arrayOfDates} })
  .then(houseDoc => {
      res.json(houseDoc)
  })
  .catch(err => next(err));
});


// Get the houses that matches the user email

router.get("/userhouses", (req, res, next) => {

  House.find({"owner" : {$eq: req.user._id}})
  .then(houseDoc => res.json(houseDoc))
  .catch(err => next(err));
})

router.delete("/deletehouse/:id", (req, res, next) => {
  const { id } = req.params;

  House.findByIdAndRemove(id)
  .then(houseDoc => {
    res.send(houseDoc)
  })
  .catch(err => next(err));
})

// // PUT /phones/:id - Update ONE phone
// router.put("/phones/:id", (req,res,next)=>{
//   const {id} = req.params
//   const {brand, model, price, image, specs} = req.body
  
//   Phone.findByIdAndUpdate(
//     id, 
//     {$set : {brand, model, price, image, specs}}, 
//     {runValidators : true, new :true}
//     )
//     .then(phoneDoc => res.json(phoneDoc))
//     .catch(err=>next(err))
// })

// // DELETE /phones/:id - Delete ONE phone
// router.delete("/phones/:id", (req,res,next)=>{
//   const {id} = req.params
//   Phone.findByIdAndRemove(id)
//   .then(phoneDoc => res.json(phoneDoc))
//   .catch(err=>next(err))
// })

module.exports = router;
