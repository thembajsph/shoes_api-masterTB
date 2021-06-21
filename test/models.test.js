const assert = require('assert');
const Models = require('../src/models/models');
const models = Models('mongodb://localhost/shoes-tests');

describe('modules should be able to', function() {


    beforeEach(function(done) {
        models.Shoes.remove({}, function(err) {
            if (err) {
                done(err)
            }
            models.Shoes.create({
                brand: 'Puma',
                color: 'black',
                price: 899,
                size: 5,
                in_stock: 1
            }, {
                brand: 'Puma',
                color: 'white',
                price: 899,
                size: 6,
                in_stock: 3
            }, {
                brand: 'Nike',
                color: 'black',
                price: 899,
                size: 6,
                in_stock: 2
            }, function(err) {
                done(err);
            });
        });
    });

    it('store Shoes to MongoDB', function(done) {
        models.Shoes.create({
            brand: 'Nike',
            color: 'red',
            price: 599,
            size: 1,
            in_stock: 1
        }, function(err, result) {
            if (err) {
                return done(err)
            }

            assert.equal("Nike", result.brand);
            assert.equal(1, result.size)
            done(err);
        });
    });

    it('create a new Shoe', function(done) {
        models.Shoes.create({
            brand: 'Adidas',
            color: 'White',
            price: 759,
            size: 6,
            in_stock: 7
        }, function(err, result) {
            if (err) {
                return done(err);
            }
            // check if the user was created
            models.Shoes.find({
                brand: 'Adidas',
                color: 'White'
            }, function(err, results) {
                if (err) {
                    return done(err);
                }

                assert.equal(1, results.length);
                assert.equal("Adidas", results[0].brand);
                done();

            });
        });
    });

    it('rejects duplicate', function(done) {

        models.Shoes.findOne({
            brand: 'Puma',
            color: 'black',
            price: 899,
            size: 5,
            in_stock: 1
        }, function(err, theShoes) {
            if (err) { //test fail if there is an error
                return done(err)
            }
            // theShoes is not in the Database
            assert.ok(theShoes !== null);

            if (theShoes) {
                assert.equal('Puma', theShoes.brand);
                assert.equal('black', theShoes.color);
                assert.equal(899, theShoes.price);
                assert.equal(5, theShoes.size);
                assert.equal(1, theShoes.in_stock);
                done();
            }

        });
    });

    it('display all the stock from MongoDB', function(done) {
        models.Shoes.find({}, function(err, stock) {
            if (err) {
                return done(err)
            }
            assert.equal(3, stock.length);
            done();
        })
    });

    it('find a selected brand', function(done) {
        models.Shoes.find({
            brand: 'Puma'
        }, function(err, result) {
            if (err) {
                return done(err)
            }

            assert.equal('Puma', result[0].brand);
            assert.equal('Puma', result[1].brand);
            assert.equal(2, result.length);
            done();
        })
    });

    it('find a selected size', function(done) {
        models.Shoes.find({
            size: 6
        }, function(err, result) {
            if (err) {
                return done(err)
            }
            assert.equal(6, result[0].size);
            assert.equal(6, result[1].size);
            assert.equal('Puma', result[0].brand);
            assert.equal('Nike', result[1].brand);
            assert.equal(2, result.length);
            done();
        })
    });

    it('find selected brand and size', function(done) {
        models.Shoes.find({
            brand: 'Puma',
            size: 5
        }, function(err, result) {
            if (err) {
                return done(err)
            }

            assert.equal('Puma', result[0].brand);
            assert.equal(5, result[0].size);
            assert.equal(1, result.length)

            done();
        })
    });

    it('remove sold-out shoe from the stock', function(done) {

        models.Shoes.findOne({}, function(err, result) {
            if (err) {
                return done(err)
            }
            result.in_stock = result.in_stock - 1;

            if (result.in_stock < 1) {
                result.remove(function(err, check) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(0, check.in_stock);

                    models.Shoes.findOne({
                        brand: 'Puma',
                        color: 'black',
                        size: 5
                    }, function (err, result) {
                        if (err) {
                            return done(err)
                        }

                        assert.equal(null, result)
                        done()
                    })
                })
            }

        });
    });
});
