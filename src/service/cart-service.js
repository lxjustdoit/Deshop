var _ds = require('util/dtools.js');

var _cart = {
    getCartCount:function(resolve,reject){
        _ds.request({
            url:_ds.getServerUrl('/cart/get_cart_product_count.do'),
            success: resolve,
            error: reject
        });
    },
    addToCart:function(productInfo, resolve,reject){
        _ds.request({
            url:_ds.getServerUrl('/cart/add.do'),
            data:productInfo,
            success: resolve,
            error: reject
        });
    }
}
module.exports = _cart;