const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');


router.get('/', (req, res, next) => {

    Order.find()
        .select('product qucntity _id')
        .populate('product','name')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/orders/' + doc._id
                        }
                    }
                })
            });

        })
        .catch(err => {
            error: err
        });

});


router.post('/', (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                res.status(404).json({
                    message: ' product Not Found'
                });
            }

            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            });
            order
                .save()
                .then(result => {
                    res.status(200).json({
                        message: 'Created Order Successully',
                        createdorder: {
                            product: result.product,
                            quantity: result.quantity,
                            _id: result._id
                        },
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/orders/' + result._id
                        }
                    }
                    );
                })

        })
        .catch(err => {
            console.log(error);
            res.status(500).json({
                error: err
            });
        });



});


router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;

    Order.findById(id)
    .populate('product')
        .exec()
        .then(order => {
            if(!order){
                res.status(404).json({ 
                    message:'Order not found'
                });
            }
            res.status(200).json({
               order:order, 
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders/'
                }
            });
        })
        .catch(err => {
            error: err
        });

});

router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order.remove({ _id: id })
        .exec()
        .then(order => {
            res.status(200).json({
                message: 'Deleted Order Successully',
                createdorder: {
                   order:order,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders/'
                    }
                }
            });
        })
        .catch(err => {
            error: err
        });

});

module.exports = router;