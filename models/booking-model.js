const mongoose = require("mongoose"); 

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
{
  arrayOfDates : {type : Array, required : true},
  guests : {type : Number, required : true},
  price : {type : Number, required : true},
  houseId : {type : Schema.Types.ObjectId, ref: "House",required : true},
  currentUser : {type : Schema.Types.ObjectId, ref: "User",required : true},
}
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
