require('./index.css');

var _ds = require('util/dtools.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
var navcom = {
    init:function(){
        this.bindEvent();
        this.loadCartCount();
        this.loadUserInfo();
        return this;
    },
    bindEvent: function(){
        $('.js-login').click(function(){
            _ds.doLogin();
        });
        $('.js-register').click(function(){
            window.location.href = './register.html';
        });
        $('.js-logout').click(function(){
            _user.logout(function(res){
                window.location.reload();
            },function(errMsg){
                _user.errorTips(errMsg);
            })
        });
    },
    //load user information
    loadUserInfo: function(){
        _user.checkLogin(function(res){
            $('.user.not-login').hide().siblings('.user.login').show()
                .find('.username').text(res.username);
        },function(errMsg){
            //do nothing
        })
    },  
    //load number in cart
    loadCartCount: function(){
        _cart.getCartCount(function(res){
            $('.user .cart-count').text(res || 0);
        }),function(errMsg){
            $('.user ,cart-count').text(0);
        }
    }
};
module.exports = navcom.init();