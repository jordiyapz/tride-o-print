const express = require('express');
const router = express.Router();

const controller = require('../controller');
const checkAuth = require('../middleware/check-auth');
const adminOnly = require('../middleware/admin-only');

router.get('/', controller.listAllUser);
router.post('/', checkAuth, adminOnly, controller.addUser);
router.get('/:userId', controller.getUser);
router.put('/:userId', checkAuth, controller.updateUser);
router.delete('/:userId', checkAuth, controller.deleteUser);
router.post('/signup', checkAuth, controller.signupUser);

module.exports = router;