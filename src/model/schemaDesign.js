const dBModel = {
    user : {
        _id: ObjectId,
        username: {
            firstname: String,
           // lastName: String
        },
        password: String,
        email: String,
        birthdate: Date,
        phoneNumber: String,
        address: {
            lists: [{
                country: String,
                city: String,
                street: String,
                zipcode: String
            }],
            primary: {
                type: {
                    country: String,
                    city: String,
                    street: String,
                    zipcode: String
                },
                default: lists[0]
            }
        }
    },

    product : {
        _id: ObjectId,
        name: String,
        seller: ObjectId,
        images: [{
            filename: String
        }],
        files: [{
            filename: String
        }],
        category: {
            type: String,
            default: 'other'
        },
        description: String,

        attributes: [{
            name: String,
            choices: [String]
        }],

        price: Double,
        discount: Number, //in Percent
        cost: Double,
        
        available: Boolean,
        sold: Number,

        rating: {
            type: Double,
            min: 0.0,
            max: 5.0
        }, //float 0.0 to 5.0
        reviews: [{
            userId: ObjectId,
            rating: {
                type: Double,
                min: 0.0,
                max: 5.0
            },
            comment: String,
            timestamp: Timestamp
        }],
        datePosted: Timestamp
    },

    customer: {
        userId: ObjectId,
        wishlists: [{
            type: ObjectId //Product Id
        }],
        carts: [{
            productId: ObjectId,
            qty: Number
        }]
    },

    seller: {
        userId: ObjectId,
        products: [ObjectId], //productId
        status: {
            type: String,
            enum: [Null, 'Star Seller', 'Best Seller'],
            default: Null
        }
    },

    printer: {
        userId: ObjectId,
        materials: [{
            type: String,
            enum: ['PLA', 'Resin', 'PETG', 'ASA', 'Stainless Steel', 'Titanium', 'ABS', 'Nylon', 'TPU', 'PEI', 'Aluminium'],
            inStock: Boolean,
            length: Number
        }],
        storeAddress: {
            country: String,
            city: String,
            street: String,
            zipcode: String
        },

        printed: Number,
        rating: {
            type: Double,
            min: 0.0,
            max: 5.0
        },
        reviews: [{
            userId: ObjectId,
            rating: {
                type: Double,
                min: 0.0,
                max: 5.0
            },
            comment: String,
            timestamp: Timestamp
        }],
        status: {
            type: String,
            enum: [Null, 'Star Printer', 'Best Printer'],
            default: Null
        }
    },

    transaction: {
        userId: ObjectId,
        productList: [{
            productId: ObjectId,
            qty: {
                type: Number,
                min: 0
            },
            material: {
                type: String,
                enum: ['PLA', 'Resin', 'PETG', 'ASA', 'Stainless Steel', 'Titanium', 'ABS', 'Nylon', 'TPU', 'PEI', 'Aluminium']
            },
            cost: {
                itemCost: Number,
                materialCost: Number
            }
        }],
        printerId: ObjectId,
        address: {
            country: String,
            city: String,
            street: String,
            zipcode: Number
        },
        deliveryMethod: {
            type: String,
            enum: ['Shipping', 'Pickup']
        },
        timeTable: {
            payment: Date,
            production: Date,
            sent: Date,
            received: Date
        },
        status: {
            type: String,
            enum: ['OK', 'Bad Shipping', 'Bad Printing']
        },
        cost: {
            itemCost: Number, //sum of every item cost
            shippingCost: Number,
            paymentCost: Number,
            totalCost: Number
        },
        timestamp: Timestamp
    }
}