'use strict';
const mongoose = require('mongoose');
module.exports = function(mongoUrl){
    mongoose.Promise = global.Promise;
    mongoose.connect(mongoUrl);

    const Shoes = mongoose.model('Shoes', {
        brand: { type: String, required: true},
        color: { type: String, required: true},
        price: { type: Number, required: true},
        size: { type: Number, required: true},
        in_stock: { type: Number, required: true}
    });

    return {
        Shoes
    };

};