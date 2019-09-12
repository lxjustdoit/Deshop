var _ds = require('util/dtools.js');

var _product = {
    //get the product list
    getProductList:function(listParam, resolve, reject){
        _ds.request({
            url:_ds.getServerUrl('/product/list.do'),
            data:listParam,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //get product detail
    getProductDetail:function(productId, resolve, reject){
        _ds.request({
            url:_ds.getServerUrl('/product/detail.do'),
            data:{productId: productId},
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
}
module.exports = _product;