const express = require('express');
const router = express.Router();

const controller = require('../controller');
const checkAuth = require('../middleware/check-auth');

router.post('/signup', controller.signupCustomer);
router.post('/signup-existing', controller.signupExistingCustomer);
router.post('/login', controller.loginCustomer);
router.get('/:customerId', checkAuth, controller.getCustomer);
router.put('/:customerId/add-to-cart', checkAuth, controller.addToCart);

module.exports = router;