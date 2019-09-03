var _ds = require('util/dtools.js');

var _user = {
    //check login status
    checkLogin:function(resolve, reject){
        _ds.request({
            url:_ds.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    }, 
    //logout function
    logout:function(resolve, reject){
        _ds.request({
            url:_ds.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    }   
}
module.exports = _user;