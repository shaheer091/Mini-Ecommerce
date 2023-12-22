const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require('path');
const routes = require('./routes/routes')
const bodyParser = require('body-parser')


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json())
app.use('/', routes)


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