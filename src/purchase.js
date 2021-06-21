'use strict';
module.exports = function(models) {
    const monngoDb = models.Shoes;
    const sold = function(req, res, done) {
        var { shoe_id } = req.params;
        monngoDb.findOne({
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

    const buyShoe = async (req, res, done) => {
       return monngoDb.findOne({
           _id: req.params.shoe_id
       }).then(result => {
        // console.log(result, 'buyShoe');
        result.in_stock = result.in_stock - 1;
        result.save();
        return result;
       }).catch(error => {
           console.log(error, 'error')
           return error;
        res.status(400).send(error)
       });
        
    }
    

    return {
        sold,
        buyShoe
    }
}
