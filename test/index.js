const { expect, assert } = require('chai');
const PURCHASE = require('../src/purchase');
const API = require('../src/search');
const ADD = require('../src/addstock');
const Models = require('../src/models/models');
const models = Models(process.env.MONGO_DB_URL || 'mongodb://localhost/shoes_test');
const Api = API(models);
const Add = ADD(models);
const Purchase = PURCHASE(models);

const [req, res, done] = [
    {
        params: {
            size: 1, brand: 'Nike'
        },
        body: {
            brand: 'brand',
            color: 'green',
            price: 499,
            size: 1,
        }
    },{
        
    },{

    }
]



console.log('aaa');
async function Test() {
    let result = await Purchase.buyShoe(req, res, done);
    // let result = await Add.new_stock(req, res, done);
    console.log('-----', result)

};

Test();