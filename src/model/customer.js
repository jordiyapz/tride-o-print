const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = mongoose.model('User');

const customerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    searchHistory: {
        type: [String]
    },
    history: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    wishlists: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    carts: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        qty: Number
    }]
});

customerSchema.statics.findByUsername = function (username, callback) {
    let query = this.findOne()
    User.findOne({'username': username}, (error, user) =>{
        query.where({
            userId: user._id
        }).exec(callback);
    })
    return query;
}

module.exports = mongoose.model('Customer', customerSchema);