const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        maxLength: 20
    },
    lastName: {
        type: String,
        maxLength: 20
    },
    email: {
        type: String,
        unique: 1,
    },
    phone: String,
    age: {
        type: Number,
        min: 18
    },
    password: {
        type: String,
        minLength: 6,
    },

    gender: {
        type: String,
        lowercase : true   
    },
    token: {
        type: String
    }
});

const User = mongoose.model("User", userSchema);
module.exports =  User ;