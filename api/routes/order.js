const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: ' Handling get request to /order'
    });
});
router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quanity: req.body.quanity
    }
    res.status(201).json({
        message: ' Handling post request to /order Saving Order',
        order: order
    });
});


router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order Details',
        id: req.params.orderId
    });

});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Delete Order Details',
        id: req.params.orderId
    });

});

module.exports = router;