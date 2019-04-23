const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const sellerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    status: {
        type: String,
        enum: [null, 'Star Seller', 'Best Seller'],
        default: null
    }
});

module.exports = mongoose.model('Seller', sellerSchema);