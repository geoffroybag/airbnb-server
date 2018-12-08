const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    // document structure & rules defined here
    object: {
      type: String,
      required: true,
      minlength: 2
    },
    // document structure & rules defined here
    message: {
      type: String,
      required: true,
      minlength: 10
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
