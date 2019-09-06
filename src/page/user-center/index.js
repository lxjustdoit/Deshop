require('../module.js');
require('page/common/nav-com/index.js');
require('page/common/header/index.js');
require('./index.css');
var navSide = require('page/common/nav-side/index.js');

var _ds = require('util/dtools.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');
var page = {
    init:function(){
        this.onload();

    },
    onload:function(){
        //initiate nav side 
        navSide.init({
            name: 'user-center',
        });
        //load user information
        this.loadUserInfo();
    },
    loadUserInfo:function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _ds.renderHtml(templateIndex);
            $('.panel=body').html(userHtml);
        },function(errMsg){
            _ds.errorTips(errMsg);
        })
    }
};
$(function(){
    page.init();
})