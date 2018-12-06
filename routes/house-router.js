const express = require("express");
const House = require("../models/house-model.js");

const router = express.Router();

router.get("/houses", (req, res, next)=>{
  House.find()
    // .limit(99)
    // send the query results as a JSON response to the client
    .then(houseResults => res.json(houseResults))
    .catch(err => next(err));
  })

router.post("/houses", (req, res, next) => {
  const { property_type, room_type, accomodates, beds, bedrooms, bathrooms, neighbourhood, amenities, title, description, country, city, price, picture_url } = req.body;
  const recordid = Math.floor(Math.random()*1000000000000)
  House.create({ recordid, property_type, room_type, accomodates, beds, bedrooms, bathrooms, neighbourhood, amenities, title, description, country, city, price, picture_url })
  .then(houseDoc => res.json(houseDoc))
  .catch(err => next(err))
})

router.get("/houses/:id", (req,res,next)=>{
  const {id} = req.params
  House.findOne({"recordid" : {$eq : id}})
  .then(houseDoc => res.json(houseDoc))
  .catch(err=>next(err))
})

router.get("/search/:where", (req,res,next)=>{
  const {where} = req.params
  console.log(req.params)
  House.find({"city" : {$eq : where}})
  .then(houseDoc => res.json(houseDoc))
  .catch(err=>next(err))
})

module.exports = router;
