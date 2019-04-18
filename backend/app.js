const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();
const API_PORT = process.env.PORT || 7000;
const app = express();
const path = require('path');
/** mongoose */
const dbRoute = "mongodb://localhost:27017/trideOPrint";

mongoose.Promise = global.Promise;
mongoose.connect(dbRoute, { useNewUrlParser: true }, (err) => {
    if (err) return console.log(err);
});
app.use('/static',express.static(path.join(__dirname,'static/')));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//** Adding CORS */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // * means allow for everyone
    res.header(
        'Access-Control-Allow-Header', 
        'Origin, X-Requested-With, Content-Type Accept, Authorization' // Which kind of header to accept
    ); 
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({}); //Breaking the middleware        
    }
    next();
})

const model = require('./src/model'); //call model

/** Routing middleware */
const pageRoutes = require('./src/router/pages');
const router = express.Router();
const userRoutes = require('./src/router/users');
const customerRoutes = require('./src/router/customers');
const sellerRoutes = require('./src/router/sellers');
const productRoutes = require('./src/router/products');
app.use(pageRoutes);
app.use('/v1/user', userRoutes);
app.use('/v1/customer', customerRoutes);
app.use('/v1/seller', sellerRoutes);
app.use('/v1/product', productRoutes);

//require('./src/router'); //importing route
//router(app);

app.listen(API_PORT, () => {
    console.log('Tride O\'Print RESTful API server started on port: ' + API_PORT);
});
