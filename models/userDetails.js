const mongoose = require("mongoose");
const userDetails = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    userID: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});
const userDetailsModel = mongoose.model("UserDetails", userDetails);

module.exports = userDetailsModel;
