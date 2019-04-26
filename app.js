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
// const dbRoute = "mongodb+srv://jordiyapz:sen45321@mongouploads-mxgpe.mongodb.net/trideOPrint?retryWrites=true";
mongoose.Promise = global.Promise;
mongoose.connect(dbRoute, { useNewUrlParser: true }, (err) => {
    if (err) return console.log(err);
});

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

app.use('/assets', express.static('assets'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const model = require('./src/model'); //call model

/** Routing middleware */
const pageRoutes = require('./src/router/pages');
const router = express.Router();

const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];
    console.log(headers);
    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        req.token = token;
        const decoded = jwt.verify(token, 'oPrint', (err, decoded) => {
            if (err)
                res.status(500).json({ error: err });
            req.userData = decoded;
            next();
        });
        
    } //else {  
        //res.json({message: 'auth-failed'});
        //res.redirect('/auth-failed');
    //}
}

app.get('/auth-failed', (req, res) => {
    //If header is undefined return Forbidden (403)        
    res.status(403).sendFile(path.resolve(__dirname, 'pages/authFailed.html'));
})
app.get('/',(req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/notReg.html'));
});
app.get('/product',(req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/product.html'));
});
app.get('/register',(req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/register.html'));
});
app.get('/home', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/index.html'));
});
app.get('/blank',(req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/blank.html'));
});

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
