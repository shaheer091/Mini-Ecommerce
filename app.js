const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require('path');
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const bodyParser = require('body-parser')
const session = require('express-session')
const nocache = require('nocache');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'Shaheer@2',
    resave: false,
    saveUninitialized: true
}))
app.use(nocache());


app.use('/', userRoutes)
app.use('/', adminRoutes)



const port = 9000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

mongoose.connect("mongodb://localhost:27017/newProject")
    .then(() => {
        console.log('Database connected');
    })
    .catch((err) => {
        console.error(err);
    });