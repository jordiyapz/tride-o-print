const mongoose= require('mongoose');
const Schema = mongoose.Schema;
const productSub = new Schema({
    filename: String,
    path: String
}, {_id: false});

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    seller: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Seller'
    },
    images: [productSub],
    files: [productSub],
    category: {
        type: String,
        default: 'other'
    },
    description: String,

    attributes: [{
        name: String,
        choices: [String]
    }],
    
    price: Schema.Types.Decimal128,
    discount: {
        type: Number,
        default: 0
    },
    cost: Schema.Types.Decimal128,
    available: {
        type: Boolean,
        default: true
    },
    sold: {
        type: Number,
        default: 0
    },

    rating: {
        type: Schema.Types.Decimal128,
        min: 0,
        max: 5,
        default: 0
    },
    reviews: [{
        userId: Schema.Types.ObjectId,
        rating: {
            type: Schema.Types.Decimal128,
            min: 0,
            max: 5
        },
        comment: String,
        timestamp: {
            type: Date,
            default: Date.now()
        }
    }],
    datePosted: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Product', productSchema);