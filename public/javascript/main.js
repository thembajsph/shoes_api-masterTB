$(function() {

    var myInfo = document.getElementById('myTable'),
        template = Handlebars.compile(myInfo.innerHTML),
        display = document.getElementById('display'),
        back_home = document.getElementsByClassName('back_home'),
        brandDropdown = document.getElementById('brandDropdown'),
        template_2 = Handlebars.compile(brandDropdown.innerHTML),
        MyBrandDropdown = document.getElementById('brands'),
        sizeDropdown = document.getElementById('sizeDropdown'),
        template_3 = Handlebars.compile(sizeDropdown.innerHTML),
        MySizeDropdown = document.getElementById('sizes');

    // POST	/api/shoes	Add a new new shoe to his stock.

    var $brand = $('#inputBrand'),
        $color = $('#inputColor'),
        $size = $('#inputSize'),
        $price = $('#inputPrice'),
        $instock = $('#inputInstock');

    $('#regBtn').on('click', function() {
        var stock = {
            brand: $brand.val(),
            color: $color.val(),
            price: $price.val(),
            size: $size.val(),
            in_stock: $instock.val()
        };
        $.ajax({
            type: 'POST',
            url: '/api/shoes',
            data: stock,
            success: function(data) {
                console.log('Successfully added new stock.');
            },
            error: function() {
                console.log('error saving stock.');
            }
        });
    });
    // GET	/api/shoes	List all shoes in stock
    $.ajax({
        type: 'GET',
        url: '/api/shoes',
        success: function(data) {
            function sortJSON(data, key, way) {
                return data.sort(function(a, b) {
                    var x = a[key];
                    var y = b[key];
                    if (way === '123') {
                        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                    }
                    if (way === '321') {
                        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                    }
                });
            }

            data = sortJSON(data, 'brand', '123');
            // console.log('data:', data);
            //Display all available stock
            var tableSearch = template({
                data
            });
            display.innerHTML = tableSearch;

            //Create a Dropdown Menu with Unique brand and size.

            var uniQBrand = [],
                uniQSize = [];
            var brandMap = {},
                sizeMap = {};

            for (var i = 0; i < data.length; i++) {
                var b = data[i].brand,
                    s = data[i].size;
                var foundBrand = false,
                    foundSize = false;

                if (brandMap[b] === undefined) {
                    brandMap[b] = b;
                    uniQBrand.push(b);
                }
                if (sizeMap[s] === undefined) {
                    sizeMap[s] = s;
                    uniQSize.push(s);
                }

            }
            //Sort brand in alphabetical order
            function sort(a, b) {
                return a - b;
            }
            uniQSize.sort();
            uniQBrand.sort();
            var tableSearch_2 = template_2({
                uniQBrand
            });

            var tableSearch_3 = template_3({
                uniQSize
            });

            MyBrandDropdown.innerHTML = tableSearch_2;
            // MySizeDropdown.innerHTML = tableSearch_3;
        }
    });

    var theBrand = null;
    var theSize = null;
    // GET	/api/shoes/brand/:brand	List all shoes for a given brand
    $('#brands').on('click', function(e) {
        var brand = e.target.text;
        theBrand = brand;

        if(brand === 'All') {
            $.ajax({
                type: 'GET',
                url: '/api/shoes',
                success: function(data) {
                    function sortJSON(data, key, way) {
                        return data.sort(function(a, b) {
                            var x = a[key];
                            var y = b[key];
                            if (way === '123') {
                                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                            }
                            if (way === '321') {
                                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                            }
                        });
                    }
        
                    data = sortJSON(data, 'brand', '123');
                    var tableSearch = template({
                        data
                    });
                    display.innerHTML = tableSearch;
        
                    var uniQBrand = [],
                        uniQSize = [];
                    var brandMap = {},
                        sizeMap = {};
        
                    for (var i = 0; i < data.length; i++) {
                        var b = data[i].brand,
                            s = data[i].size;
                        var foundBrand = false,
                            foundSize = false;
        
                        if (brandMap[b] === undefined) {
                            brandMap[b] = b;
                            uniQBrand.push(b);
                        }
                        if (sizeMap[s] === undefined) {
                            sizeMap[s] = s;
                            uniQSize.push(s);
                        }
        
                    }
                    //Sort brand in alphabetical order
                    function sort(a, b) {
                        return a - b;
                    }
                    uniQSize.sort();
                    uniQBrand.sort();
                    var tableSearch_2 = template_2({
                        uniQBrand
                    });
        
                    var tableSearch_3 = template_3({
                        uniQSize
                    });
        
                    MyBrandDropdown.innerHTML = tableSearch_2;
                },
                error: function(error) {
                    console.log('error:', error)
                }
            });

        } else {
        $.ajax({
            type: 'GET',
            url: '/api/shoes/brand/' + brand,
            success: function(data) {
                var tableSearch = template({
                    data
                });
                display.innerHTML = tableSearch;
                // GET	/api/shoes/brand/:brand/size/:size	List all shoes for a given brand and size
                if (theSize !== null) {
                    $.ajax({
                        type: 'GET',
                        url: '/api/shoes/brand/' + theBrand + '/size/' + theSize,
                        success: function(data) {
                            var tableSearch = template({
                                data
                            });

                            if (data.length <= 0) {
                                display.innerHTML = 'No stock found.';
                            }

                            if (data.length > 0) {
                                display.innerHTML = tableSearch;
                            }
                            //reset Dropdown values to null
                            theBrand = null;
                            theSize = null;
                        }
                    });
                }
            }
        });

    }
    });

    // GET	/api/shoes/size/:size	List all shoes for a given size
    $('#sizes').on('click', function(e) {
        var size = e.target.text;
        theSize = size
        $.ajax({
            type: 'GET',
            url: '/api/shoes/size/' + size,
            success: function(data) {
                if (theBrand === null) {
                    var tableSearch = template({
                        data
                    });

                    if (data.length <= 0) {
                        display.innerHTML = 'No stock found.'
                    }

                    if (data.length > 0) {
                        display.innerHTML = tableSearch;
                    }
                }
                // GET	/api/shoes/brand/:brand/size/:size	List all shoes for a given brand and size
                if (theBrand !== null) {
                    $.ajax({
                        type: 'GET',
                        url: '/api/shoes/brand/' + theBrand + '/size/' + theSize,
                        success: function(data) {
                            var tableSearch = template({
                                data
                            });

                            if (data.length <= 0) {
                                display.innerHTML = 'No stock found.';
                            }

                            if (data.length > 0) {
                                display.innerHTML = tableSearch;
                            }
                            //reset Dropdown values to null
                            theBrand = null;
                            theSize = null;
                        }
                    });
                }
            }
        });
    });

    // POST	/api/shoes/sold/:id	Update the stock levels when a shoe is sold
    $('#display').on('click', function(e) {
        var product_id = e.target.id;

        //btn btn-primary btn-sm
        $.ajax({
            type: 'POST',
            url: '/api/shoes/sold/' + product_id,
            success: function(data) {
                var tableSearch = template({
                    data
                });
                display.innerHTML = data + '.<br> <a href="" onClick="window.location.reload()">Search</>';
            }
        });
    });
});
