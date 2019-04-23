const express = require('express');
const router = express.Router();

const controller = require('../controller');
const checkAuth = require('../middleware/check-auth');

router.get('/', controller.listAllSeller);
router.post('/signup', controller.signupSeller);
router.post('/signup-existing', controller.signupExistingSeller);
router.post('/login', controller.loginSeller);

module.exports = router;
