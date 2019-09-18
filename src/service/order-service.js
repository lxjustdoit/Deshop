var _ds = require('util/dtools.js');

var _order = {
    //get the product list
    getProductList:function(resolve, reject){
        _ds.request({
            url:_ds.getServerUrl('/order/get_order_cart_product.do'),
            success: resolve,
            error: reject
        });
    },
    createOrder:function(orderInfo, resolve, reject){
        _ds.request({
            url:_ds.getServerUrl('/order/create.do'),
            data: orderInfo,
            success: resolve,
            error: reject
        });
    },
    getOrderList:function(listParam, resolve, reject){
        _ds.request({
            url:_ds.getServerUrl('/order/list.do'),
            data: listParam,
            success: resolve,
            error: reject
        });
    },
    getDetail:function(orderNumber, resolve, reject){
        _ds.request({
            url:_ds.getServerUrl('/order/orderNo.do'),
            data: {
                orderNumber:orderNumber
            },
            success: resolve,
            error: reject
        });
    },
    //cancel order
    cancelOrder:function(orderNumber, resolve, reject){
        _ds.request({
            url:_ds.getServerUrl('/order/cancel.do'),
            data: {
                orderNumber:orderNumber
            },
            success: resolve,
            error: reject
        });
    },
}
module.exports = _order;