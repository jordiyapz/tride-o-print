const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    birthdate: Date,
    phoneNumber: {
        type: String,
        required: true
    },
    address: [{
        lists: [{
            country: String,
            city: String,
            street: String,
            zipcode: String
        }],
        primary: {
            type: Number,
            default: -1
        }
    }],
    roles: [{
        type: String,
        enum: ['Admin', 'Customer', 'Seller', 'Printer']
    }]
});

module.exports = mongoose.model('User', userSchema);