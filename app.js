const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing');
const path = require('path');

main().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});


// Connect to MongoDB
async function main() { 
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderHub');
     }

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

//basic api
app.get('/', (req, res) => {
    res.send('Hello World!');
});


//lists all places name
app.get("/listings",async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
}
);

//when clicked in any place name
app.get("/listings/:id", async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show", { listing });
}
);