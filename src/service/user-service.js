var _ds = require('util/dtools.js');

var _user = {
    login:function(userInfo, resolve, reject){
        _ds.request({
            url:_ds.getServerUrl('/user/login.do'),
            data:userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    checkUsername:function(username, resolve, reject){
        _ds.request({
            url:_ds.getServerUrl('/user/check_valid.do'),
            data:{
                type:'username',
                str :username,
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    register:function(userInfo, resolve, reject){
        _ds.request({
            url:_ds.getServerUrl('/user/register.do'),
            data:userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //check login status
    checkLogin:function(resolve, reject){
        _ds.request({
            url:_ds.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    }, 
    //get the security question
    getQuestion:function(userName, resolve, reject){
        _ds.request({
            url:_ds.getServerUrl('/user/forget_get_question.do'),
            data:{
                username:username
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    checkAnswer:function(userInfo, resolve, reject){
        _ds.request({
            url:_ds.getServerUrl('/user/forget_check_answer.do'),
            data:userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    resetPassword:function(userInfo, resolve, reject){
        _ds.request({
            url:_ds.getServerUrl('/user/forget_reset_password.do'),
            data:userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    getUserInfo:function(resolve, reject){
        _ds.request({
            url:_ds.getServerUrl('/user/get_Information.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },   
    updateUserInfo:function(userInfo, resolve, reject){
        _ds.request({
            url:_ds.getServerUrl('/user/update_information.do'),
            data:userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    updatePassword:function(userInfo, resolve, reject){
        _ds.request({
            url:_ds.getServerUrl('/user/reset_password.do'),
            data:userInfo,
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