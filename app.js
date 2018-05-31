const express = require('express');
const app = express();
const morgan = require('morgan');
const productRoutes = require('./api/routes/product');
const orderRoutes = require('./api/routes/order');

// app.use((req,res,next)=>{
//     res.status(200).json({ 
//         message:'It works'
//     });
// });

//Morgan used for logging

app.use(morgan('dev'));
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


// Error Handling for unknown routes
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404 ;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    console.log(res.status);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;