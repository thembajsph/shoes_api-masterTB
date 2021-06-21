'use strict';
module.exports = function(models) {
    const mongoDb = models.Shoes;
    const index = function(req, res, done) {
        mongoDb.find({}, function(err, stock) {
            if (err) {
                res.status(400).send(err);
            }
            res.status(200).send(stock);
        });
    };
    return {
        index
    }
}
