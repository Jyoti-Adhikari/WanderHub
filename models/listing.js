const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
        type: String,
        required: true },

  description: {
     type: String,
     required: true },   
    
  image: { type: String, required: true,
    set: (v) => v == "" ? "https://images.unsplash.com/photo-1630997065202-afb8c444da0a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
    },
     
  price: { type: Number, required: true },

});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;