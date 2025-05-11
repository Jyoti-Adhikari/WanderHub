const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing');

main().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});


// Connect to MongoDB
async function main() { 
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderHub');
     }

// Create the database and collection
const initDB = async () => {
    await Listing.deleteMany({}); // Clear the collection
    await Listing.insertMany(initData.data);
    console.log('Inserted data into the collection');
}

// Call the initDB function to initialize the database
initDB();