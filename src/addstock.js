'use strict';
module.exports = function(models) {
    const new_stock = function(req, res, done) {
        var stock = req.body,
            brand = stock.brand.toLowerCase(),  //capitalize brand
            color = stock.color.toLowerCase();  //capitalize color

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
        }, function(err, foundShoe) {
            if (err) {
                return done(err)}

            if (!foundShoe) {
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
                        return done(err)}
                    console.log('Added new stock');
                    res.status(200).send(stock)
                });
            }
            if (foundShoe) {
                //if it exists, update in_stock to a give value,
                foundShoe.in_stock = foundShoe.in_stock + 10;
                foundShoe.save(function(err, noErr) {
                    if (err) {
                        return done(err)}
                })
                res.status(200).send(foundShoe)
            }
        })
    };
    return {
        new_stock
    };
}
