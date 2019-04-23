const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');        
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toDateString() + ' - ' + file.originalname)
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
        cb(null, true);
    else
        cb(null, false);
}
const upload = multer({storage, limits: {
    fileSize: 1024 * 1024 * 64, //64MB max
    fileFilter
}}); 

const adminOnly = require('../middleware/admin-only');

const controller = require('../controller');

router.get('/', controller.listAllProduct);
router.post('/add-product', upload.array('image'), controller.addProduct);
// router.post('/add-many-product', upload.array('image'), controller.addProduct);

module.exports = router;