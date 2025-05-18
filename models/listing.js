const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,  
    required: true,
    default: "https://images.unsplash.com/photo-1630997065202-afb8c444da0a"
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
