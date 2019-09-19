var _ds = require('util/dtools.js');

var _payment = {
    //get the payment information
    getPaymentInfo:function(orderNumber, resolve, reject){
        _ds.request({
            url:_ds.getServerUrl('/order/pay.do'),
            data:{
                orderNo: orderNumber
            },
            success: resolve,
            error: reject
        });
    },
    //get order status
    getPaymentStatus:function(orderNumber, resolve, reject){
        _ds.request({
            url:_ds.getServerUrl('/order/query_order_pay_status.do'),
            data:{
                orderNo: orderNumber
            },
            success: resolve,
            error: reject
        });
    },
}
module.exports = _payment; 