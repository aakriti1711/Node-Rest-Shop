const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/product');
const orderRoutes = require('./api/routes/order');

mongoose.connect('mongodb://localhost/nodeShop'); 

// app.use((req,res,next)=>{
//     res.status(200).json({   
//         message:'It works'
//     });
// });

//Morgan used for logging

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({
    extended: false
}));


app.use(bodyParser.json());         //Added body parser 


//Handle CORS Request
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With,Content-Type , Accept,Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,PATCH,DELETE,POST,GET');
        res.status(200).json({});
    }
    next();
});


app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


// Error Handling for unknown routes
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
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