var _ds = require('util/dtools.js');

var _address = {
    //get the product list
    getAddressList:function(resolve, reject){
        _ds.request({
            url:_ds.getServerUrl('/shipping/list.do'),
            data: {
                pageSize : 50
            },
            success: resolve,
            error: reject
        });
    },
    //create new address
    save:function(addressInfo, resolve, reject){
        _ds.request({
            url:_ds.getServerUrl('/shipping/add.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        });
    },
    //update receiver information
    update:function(addressInfo, resolve, reject){
        _ds.request({
            url:_ds.getServerUrl('/shipping/update.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        });
    },
    deleteAddress:function(shippingId, resolve, reject){
        _ds.request({
            url:_ds.getServerUrl('/shipping/del.do'),
            data: {shippingId:shippingId},
            success: resolve,
            error: reject
        });
    },
    //get one address
    getAddress:function(shippingId, resolve, reject){
        _ds.request({
            url:_ds.getServerUrl('/shipping/select.do'),
            data: {
                shippingId:shippingId
            },
            success: resolve,
            error: reject
        });
    }
}
module.exports = _address;