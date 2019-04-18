const express = require('express');
const router = express.Router();
const path = require('path');

// const controller = require('../controller');
const checkAuth = require('../middleware/check-auth');

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../static/index.html'));
    // console.log((__dirname + 'store.html'));
});

module.exports = router;