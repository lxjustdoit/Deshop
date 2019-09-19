require('../module.js');
require('page/common/nav-com/index.js');
require('page/common/header/index.js');
require('./index.css');

var _ds = require('util/dtools.js');
var _payment = require('service/payment-service.js');
var templateIndex = require('./index.string');

var page = {
    data:{
        orderNumber: _ds.getUrlParam('orderNumber')
    },
    init:function(){
        // this.onload();
    },
    onload:function(){
        //initiate nav side 
        navSide.init({
            name: 'order-list',
        });
        this.loadPayment();
    },
    //load order list
    loadPayment:function(){
        var paymentHtml = [],
            _this = this,
            $pageWrap = $('.page-wrap');
        $content.html('<div class="loading"></div>');
        _payment.getPayemntInfo(this.data.orderNumber, function(res){
            //render html
            paymentHtml = _ds.renderHtml(templateIndex, res);
            $pageWrap.html(paymentHtml);
            _this.listenOrderStatus();
        }, function(errMsg){
            $pageWrap.html('<p class="err-tip">'+ errMsg +'</p>')
        });
    },
    //listen order status
    listenOrderStatus:function(){
        var _this = this;
        this.paymentTimer = window.setInterval(function(){
            _payment.getPayemntStatus(_this.data.orderNumber, function(res){
                if(res == true){
                    window.location.href = './result.hmtl?type=payment&orderNumber=' 
                                            + _this.data.orderNumber;
                }
            })
        }, 5e3);
    }
};
$(function(){
    page.init();
})