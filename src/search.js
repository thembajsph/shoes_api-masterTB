'use strict';
const _ = require('lodash');
module.exports = function(models) {
    const mongoDb = models.Shoes;
    const getShoeByBrand = function(req, res, done) {
        var brand = req.params.brand;
        mongoDb.find({
            brand: req.params.brand
        }, function(err, brandsFound) {
            if (err) {
                return done(err)}

            console.log('Searched for a shoe brand');
            res.status(200).send(brandsFound)
        })
    }

    const getShoeBySize = function(req, res, done) {
        var size = req.params.size;

        mongoDb.find({
            size: req.params.size
        }, function(err, brandsFound) {
            if (err) {
                return done(err)}

            console.log('Searched for a shoe size');
            res.status(200).send(brandsFound)
        })
    }

    // const brand_size = function(req, res, done) {
    //     var brand = req.params.brand;
    //     var size = req.params.size;

    //     mongoDb.find({
    //         brand: req.params.brand,
    //         size: req.params.size
    //     }, function(err, brandsFound) {
    //         if (err) {
    //             return done(err)}

    //         console.log('Brand and size send.');
    //         res.status(200).send(brandsFound)
    //     })
    // }

    const findShoeByBrandAndSize = (req, res) => {
        let { brand, size } = req.params;
        // console.log('--', brand, size)
        return mongoDb.find({
            brand
            // size
        }).then(shoes => {
            if (size) {
                let m = shoes;
                console.log(m, 'M')

                let b = _.get(m, {size});
                console.log(m, 'sizeeee', b)
            }
                // console.log(shoes)
            res.status(200).send(shoes);
        }).catch(e=> res.status(400).send(e))
    }

    return {
        getShoeBySize,
        getShoeByBrand,
        findShoeByBrandAndSize
    };
}
