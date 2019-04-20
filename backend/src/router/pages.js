const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', (req, res, next) => {
    // res.sendFile(path.join(__dirname, '../../static/index.html'));
    res.sendFile(path.resolve(__dirname, '../../static/index.html'));
    // console.log((__dirname + 'store.html'));
});

module.exports = router;