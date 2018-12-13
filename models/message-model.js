const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    // document structure & rules defined here
    message : [{
      guestMessage: {type : String},
      hostMessage: {type : String}, 
      sender : {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      recipient : {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
    }],
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    arrayOfDates: {
      type: Array,
    },
    city: {
      type: String,
    },
    price: {
      type: Number,
    },
  },
  {
    // additional settings for the Schema class
    timestamps: true
  }
);



// "Message" model -> "Messages" collection
const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
