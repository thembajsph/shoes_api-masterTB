'use strict';
/*
module.exports = function(models) {

    const index = function(req, res, done) {

        models.Shoes.find({}, function(err, foundStock) {
            if (err) {
                return done(err)
            }
            console.log('Home Page');
            res.status(200).send(foundStock)

        })
    };

    const new_stock = function(req, res, done) {
        var stock = req.body;

        //capitalize color and brand
        var brand = stock.brand.toLowerCase();
        var color = stock.color.toLowerCase();

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        stock.brand = capitalizeFirstLetter(brand);
        stock.color = capitalizeFirstLetter(color);
        //search in the database if brand, size price and color exists
        models.Shoes.findOne({
            brand: stock.brand,
            color: stock.color,
            price: stock.price,
            size: stock.size
        }, function (err, foundResults) {
            if (err) {
                return done(err)
            }

            if (!foundResults) {
                // if not, create a new
                models.Shoes.create({
                    brand: stock.brand,
                    color: stock.color,
                    price: stock.price,
                    size: stock.size,
                    in_stock: stock.in_stock
                }, function(err, result) {
                    if (err) {
                        res.status(500).send(err.message)
                        return done(err);
                    }
                    console.log('Added new stock');
                    res.status(200).send(stock)
                });
            }
            if (foundResults) {
                //if it exists, update in_stock to a give value,

                foundResults.in_stock = foundResults.in_stock + 10;

                foundResults.save(function(err, noErr) {
                    if (err) {
                        return done(err)
                    }
                })

                res.status(200).send(foundResults)
            }

        })

    };

    const brand_search = function(req, res, done) {
        var brand = req.params.brand;
        models.Shoes.find({
            brand: req.params.brand
        }, function(err, brandsFound) {
            if (err) {
                return done(err)
            }
            console.log('Searched for a shoe brand');
            res.status(200).send(brandsFound)
        })

    }

    const size_search = function(req, res, done) {
        var size = req.params.size;

        models.Shoes.find({
            size: req.params.size
        }, function(err, brandsFound) {
            if (err) {
                return done(err)
            }
            console.log('Searched for a shoe size');
            res.status(200).send(brandsFound)
        })

    }

    const brand_size = function(req, res, done) {
        var brand = req.params.brand;
        var size = req.params.size;

        models.Shoes.find({
            brand: req.params.brand,
            size: req.params.size
        }, function(err, brandsFound) {
            if (err) {
                return done(err)
            }
            console.log('Brand and size send.');
            res.status(200).send(brandsFound)
        })
    }

    const sold = function(req, res, done) {
        var shoe_id = req.params.shoe_id;

        models.Shoes.findOne({
            _id: shoe_id
        }, function(err, result) {
            if (err) {
                return done(err)
            }

            result.in_stock = result.in_stock - 1;

            result.save(function(err, result) {
                if (err) {
                    return done(err)
                }
            });
            console.log('Sold a shoe');
            if (result.in_stock < 1) {
                result.remove(function(err, check) {
                    if (err) {
                        return done(err)
                    }
                    console.log(check.brand + ' size ' + check.size + ', ' + check.color + ' is sold out.');
                })
            }
            res.status(200).send(result.brand + ' size ' + result.size + ', ' + result.color + ' have been sold for R' + result.price + '. Avail in store: ' + result.in_stock);
        })

    }

    return {
        index,
        new_stock,
        size_search,
        brand_search,
        brand_size,
        sold
    };
};
*/
