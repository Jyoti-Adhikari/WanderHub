const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync');
const ExpressError = require('./utils/ExpressError');
const listingValidationSchema = require('./validation/listingValidation');


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
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));


//basic api
app.get('/', (req, res) => {
    res.send('Hello World!');
});


//lists all places name
app.get("/listings", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
}));


//route to create a new listing
app.get("/listings/new", (req, res) => {
    res.render("listings/new");
}
);


//when clicked in any place name
app.get("/listings/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show", { listing });
}));

// Create new route after clicking submit button
app.post("/listings", wrapAsync(async (req, res, next) => {
    const { error } = listingValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details.map(e => e.message).join(", "));
    }

    const { title, price, description, location, country, image } = req.body;

    const newListing = new Listing({
        title,
        price,
        description,
        image,
        location,
        country
    });

    await newListing.save();
    res.redirect(`/listings/`);
}));

//Edit route
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit", { listing });
}));


// Update listing – handles form submission from the edit page
app.put("/listings/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const { title, price, description, location, country, image } = req.body;
    const updatedListing = await Listing.findByIdAndUpdate(
        id,
        {
            title,
            price,
            description,
            image,
            location,
            country
        },
        { new: true }
    );
    res.redirect(`/listings/`);
}));

//to delete a listing
app.delete("/listings/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect(`/listings/`);
}));



// Test error handling
app.get("/test-error", wrapAsync(async (req, res) => {
    throw new ExpressError("Test error message", 404);
}));



// Error handling middleware
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something went wrong';
    res.status(statusCode).render('error', { err });
});



