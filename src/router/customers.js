const express = require('express');
const router = express.Router();

const controller = require('../controller');

router.post('/signup', controller.signupCustomer);
router.post('/signup-existing', controller.signupExistingCustomer);
router.post('/login', controller.loginCustomer);

module.exports = router;