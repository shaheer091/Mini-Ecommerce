const mongoose = require("mongoose");
const userDetails = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    place: {
        type: String,
        default: "user",
    },
});
const userDetails = mongoose.model("UserDetails", userDetails);




module.exports = userDetails;
