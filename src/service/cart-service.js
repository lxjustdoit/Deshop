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
    },
    selectProduct:function(productId, resolve,reject){
        _ds.request({
            url:_ds.getServerUrl('/cart/select.do'),
            data:{
                productId:productId
            },
            success: resolve,
            error: reject
        });
    },
    unselectProduct:function(productId, resolve,reject){
        _ds.request({
            url:_ds.getServerUrl('/cart/unselect.do'),
            data:{
                productId:productId
            },
            success: resolve,
            error: reject
        });
    },
    //select all product
    selectAllProduct:function(resolve,reject){
        _ds.request({
            url:_ds.getServerUrl('/cart/select_all.do'),
            success: resolve,
            error: reject
        });
    },
    unselectAllProduct:function(resolve,reject){
        _ds.request({
            url:_ds.getServerUrl('/cart/un_select_all.do'),
            success: resolve,
            error: reject
        });
    },
    //update product number
    updateProduct:function(productInfo, resolve,reject){
        _ds.request({
            url:_ds.getServerUrl('/cart/update.do'),
            data:productInfo,
            success: resolve,
            error: reject
        });
    },
    deletProduct:function(productIds, resolve,reject){
        _ds.request({
            url:_ds.getServerUrl('/cart/delete_product.do'),
            data:{
                productIds:productIds
            },
            success: resolve,
            error: reject
        });
    },
    getCartList:function(resolve,reject){
        _ds.request({
            url:_ds.getServerUrl('/cart/list.do'),
            success: resolve,
            error: reject
        });
    }
}
module.exports = _cart;