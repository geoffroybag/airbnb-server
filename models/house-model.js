const mongoose = require("mongoose");
require ("dotenv").config()
const Schema = mongoose.Schema
const mongoolia = require('mongoolia').default;

const houseSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  datasetid: {type : String, algoliaIndex: true},
  recordid: {type : String, algoliaIndex: true},
    review_scores_accuracy:{type : Number, algoliaIndex: true},
      reviews_per_month:{type : Number, algoliaIndex: true},
      beds:{type : Number, algoliaIndex: true},
      bathrooms:{type : Number, algoliaIndex: true},
      first_review:{type : Date, algoliaIndex: true},
      host_identity_verified:{type : String, algoliaIndex: true},
      listing_url:{type : String, algoliaIndex: true},
      transit:{type : String, algoliaIndex: true},
      calendar_last_scraped:{type : Date, algoliaIndex: true},
      neighbourhood_cleansed:{type : String, algoliaIndex: true},
      host_neighbourhood:{type : String, algoliaIndex: true},
      street:{type : String, algoliaIndex: true},
      require_guest_profile_picture:{type : String, algoliaIndex: true},
      calendar_updated:{type : String, algoliaIndex: true},
      country_code:{type : String, algoliaIndex: true},
      is_location_exact:{type : String, algoliaIndex: true},
      review_scores_cleanliness:{type : Number, algoliaIndex: true},
      property_type:{type : String, algoliaIndex: true},
      availability_365:{type : Number, algoliaIndex: true},
      host_location:{type : String, algoliaIndex: true},
      neighbourhood:{type : String, algoliaIndex: true},
      city:{type : String, algoliaIndex: true},
      neighborhood_overview:{type : String, algoliaIndex: true},
      longitude:{type : Number, algoliaIndex: true},
      space:{type : String, algoliaIndex: true},
      availability_60:{type : Number, algoliaIndex: true},
      picture_url:{type : String, algoliaIndex: true}, 
      zipcode:{type : String, algoliaIndex: true},
      host_since:{type : Date, algoliaIndex: true},
      availability_90:{type : Number, algoliaIndex: true},
      state:{type : String, algoliaIndex: true},
      amenities:{type : String, algoliaIndex: true},
      security_deposit:{type : Number, algoliaIndex: true},
      maximum_nights:{type : Number, algoliaIndex: true},
      cancellation_policy:{type : String, algoliaIndex: true},
      latitude:{type : Number, algoliaIndex: true},
      review_scores_location:{type : Number, algoliaIndex: true},
      summary:{type : String, algoliaIndex: true},
      review_scores_checkin:{type : Number, algoliaIndex: true},
      instant_bookable:{type : String, algoliaIndex: true},
      host_picture_url:{type : String, algoliaIndex: true},
      description:{type : String, algoliaIndex: true},
      review_scores_communication:{type : Number, algoliaIndex: true},
      experiences_offered:{type : String, algoliaIndex: true},
      price:{type : Number, algoliaIndex: true},
      bedrooms:{type : Number, algoliaIndex: true},
      extra_people:{type : Number, algoliaIndex: true},
      smart_location:{type : String, algoliaIndex: true},
      xl_picture_url:{type : String, algoliaIndex: true},
      xl_picture_url_2:{type : String, algoliaIndex: true},
      xl_picture_url_3:{type : String, algoliaIndex: true},
      last_review:{type : Date, algoliaIndex: true},
      host_verifications:{type : Array, algoliaIndex: true},
      market:{type : String, algoliaIndex: true},
      host_response_rate:{type : String, algoliaIndex: true},
      host_about:{type : String, algoliaIndex: true},
      host_url:{type : String, algoliaIndex: true},
      availability_30:{type : Number, algoliaIndex: true},
      review_scores_rating:{type : Number, algoliaIndex: true},
      review_scores_value:{type : Number, algoliaIndex: true},
      calculated_host_listings_count:{type : Number, algoliaIndex: true},
      name:{type : String, algoliaIndex: true},
      medium_url:{type : String, algoliaIndex: true},
      bed_type:{type : String, algoliaIndex: true},
      country:{type : String, algoliaIndex: true},
      host_response_time:{type : String, algoliaIndex: true},
      geopoint: {type : Array, algoliaIndex: true},
      has_availability: {type : String, algoliaIndex: true},
      number_of_reviews: {type : Number, algoliaIndex: true},
      accommodates: {type : Number, algoliaIndex: true},
      host_listings_count: {type : Number, algoliaIndex: true},
      requires_license: {type : String, algoliaIndex: true},
      minimum_nights: {type : Number, algoliaIndex: true},
      host_is_superhost: {type : String, algoliaIndex: true},
      thumbnail_url: {type : String, algoliaIndex: true},
      cleaning_fee: {type : Number, algoliaIndex: true},
      last_scraped: {type : Date, algoliaIndex: true},
      require_guest_phone_verification: {type : String, algoliaIndex: true},
      guests_included: {type : Number, algoliaIndex: true},
      host_total_listings_count: {type : Number, algoliaIndex: true},
      host_thumbnail_url: {type : String, algoliaIndex: true},
      host_name: {type : String, algoliaIndex: true},
      room_type: {type : String, algoliaIndex: true},
      host_has_profile_pic: {type : String, algoliaIndex: true},
      host_acceptance_rate: {type : String, algoliaIndex: true},
      availableDates : {type: Array},
  }, {
  timestamps : true
});






houseSchema.plugin(mongoolia, {
  appId : process.env.ALGOLIA_APP_ID,
  apiKey : process.env.ALGOLIA_ADMIN_KEY,
  indexName : "dev_data"
})

const House = mongoose.model("House", houseSchema)

module.exports = House;
