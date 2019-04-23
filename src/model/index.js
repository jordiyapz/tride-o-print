'use strict';
const mongoose = require('mongoose');

const UserModel = require('./user');
const ProductModel = require('./product');
const CustomerModel = require('./customer');
const SellerModel = require('./Seller');

module.exports = {
    UserModel,
    ProductModel,
    CustomerModel,
    SellerModel
}