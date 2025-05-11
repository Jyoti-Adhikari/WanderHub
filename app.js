const express = require('express');
const app = express();
const mongoose = require('mongoose');

//basic api
app.get('/', (req, res) => {
    res.send('Hello World!');
});


main().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});


// Connect to MongoDB
async function main() { 
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
     }

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
