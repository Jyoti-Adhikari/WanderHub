const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

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
app.get("/listings",async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
}
);

//route to create a new listing
app.get("/listings/new", (req, res) => {
    res.render("listings/new");
}
);


//when clicked in any place name
app.get("/listings/:id", async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show", { listing });
}
);

// Create new route after clicking submit button
app.post("/listings", async (req, res) => {
    const { title, price, description, location, country, image } = req.body;

    const newListing = new Listing({
        title,
        price,
        description,
        image: {
            url: image || "https://images.unsplash.com/photo-1630997065202-afb8c444da0a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            filename: "default"  // Optional: you can use a better name or extract from the URL
        },
        location,
        country
    });

    await newListing.save();
    res.redirect(`/listings/`);
});


//Edit route
app.get("/listings/:id/edit", async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit", { listing });
}
);


// Update listing – handles form submission from the edit page
app.put("/listings/:id", async (req, res) => {
    const { id } = req.params;
    const { title, price, description, location, country, image } = req.body;

    const updatedListing = await Listing.findByIdAndUpdate(
        id,
        {
            title,
            price,
            description,
            image: {
                url: image,
                filename: "updated" // optional
            },
            location,
            country
        },
        { new: true }
    );

    res.redirect(`/listings/`);
});

//to delete a listing
app.delete("/listings/:id", async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect(`/listings/`);
}
);
