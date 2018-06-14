const express = require('express');
const router = express.Router();
const multer = require('multer');

const Product = require('../models/product');
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const productController = require('../controllers/products');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});



router.get('/', productController.product_get_all);

router.post('/', upload.single('productImage'), checkAuth, productController.product_create_product);

router.get('/:productId', productController.product_get_product);

router.patch('/:productId', checkAuth, productController.product_patch_product);

router.delete('/:productId', checkAuth, productController.product_delete_product);


module.exports = router;