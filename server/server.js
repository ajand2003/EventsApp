const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

var events = require('./routers/events');
var users = require('./routers/users');

app.use('/events', events);
app.use('/users', users);

ATLAS_URI = "mongodb+srv://ajand2003:Cat123pie@cluster0.xrmrqqr.mongodb.net/?retryWrites=true&w=majority"

const uri = ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})





app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});