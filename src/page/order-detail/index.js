require('../module.js');
require('page/common/nav-com/index.js');
require('page/common/header/index.js');
require('./index.css');
var navSide = require('page/common/nav-side/index.js');

var _ds = require('util/dtools.js');
var _order = require('service/order-service.js');
var templateIndex = require('./index.string');

var page = {
    data:{
        orderNumber: _ds.getUrlParam('orderNumber')
    },
    init:function(){
        this.onload();
        this.bindEvent();
    },
    onload:function(){
        //initiate nav side 
        navSide.init({
            name: 'order-list',
        });
        this.loadDetail();
    },
    bindEvent:function(){
        var _this = this;
        $(docuemnt).on('click', 'order-cancel', function(){
            if(window.confirm('Are you sure cancel this order?')){
                _order.cancelOrder(_this.data.orderNumber, function(res){
                    _ds.successTips('The order has been canceled');
                    _this.loadDetail();
                }, function(errMsg){
                    _ds.errorTips(errMsg);
                })
            }
        })
    },
    //load order list
    loadDetail:function(){
        var orderDetailHtml = [],
            _this = this,
            $content = $('.content');
        $content.html('<div class="loading"></div>');
        _order.getDetail(this.data.orderNumber, function(res){
            _this.dataFilter(res);
            //render html
            orderDetailHtml = _ds.renderHtml(templateIndex, res);
            $content.html(orderDetailHtml);
        }, function(errMsg){
            $content.html('<p class="err-tip">'+ errMsg +'</p>')
        });
    },
    dataFilter:function(data){
        //10 status is order submitted, but have not paied
        data.needPay = data.status == 10;
        data.isCancelable = data.status == 10;
    }
};
$(function(){
    page.init();
})