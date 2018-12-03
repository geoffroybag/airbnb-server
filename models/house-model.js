const mongoose = require("mongoose");

const Schema = mongoose.Schema

const houseSchema = new Schema({
  beds : {type : Number},
  bathrooms : {type : Number},
  bedrooms : {type : Number},
  host_neighbourhood : {type : String,},
  street : {type : String,},
  zipcode : {type : String,},
  country : {type : String,},
  country_code: {type : String},
  property_type: {type : String},
  host_id : [{hostId : {type : Schema.Types.ObjectId, ref: "User"}}], 
  review_scores_rating : {type : Number},
  neighborhood_overview : {type : String},
  thumbnail_url : {type : String},
  picture_url : {type : String},
  xl_picture_url : {type : String},
  host_since : {type : Date},
  name : {type : String},
  description : {type : String},
  price : {type : Number},
  number_of_reviews : {type : Number},
  accomomodates : {type : Number},
  minimum_nights : {type : Number},
  host_is_superhost : {type : Boolean},
  has_availability : {type : Boolean},
  cleaning_fee : {type : Number},
  guests_included : {type : Number},
  room_type : {type : Number},
  amenities : [{type : String}],
  geopoint : [{type : String}],
}, {
  timestamps : true
});


const House = mongoose.model("House", houseSchema)

module.exports = House;
