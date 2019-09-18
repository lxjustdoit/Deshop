require('../module.js');
require('page/common/nav-com/index.js');
require('page/common/header/index.js');
require('./index.css');
var navSide = require('page/common/nav-side/index.js');

var _ds = require('util/dtools.js');
var _order = require('service/order-service.js');
var templateIndex = require('./index.string');
var Pagination = require('util/pagination/index.js');

var page = {
    data:{
        listParam:{
            pageNum:1,
            pageSize:10,
        }
    },
    init:function(){
        this.onload();

    },
    onload:function(){
        this.loadOrderList();
        //initiate nav side 
        navSide.init({
            name: 'order-list',
        });
    },
    //load order list
    loadOrderList:function(){
        var orderListHtml = [],
            _this = this,
            $listCon = $('.order-list-con');
        $listCon.html('<div class="loading"></div>');
        _order.getOrderList(this.data.listParam, function(res){
            //render html
            orderListHtml = _ds.renderHtml(templateIndex, res);
            $listCon.html(orderListHtml);
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                hasNextPage: res.hasNextPage,
                pageNum: res.pageNum,
                pages: res.pages,
            });
        }, function(errMsg){
            $listCon.html('<p class="err-tip">Load failure, please try again</p>')
        });
    },
    loadPagination:function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadPrderList();
            }
        }))
    },
};
$(function(){
    page.init();
})