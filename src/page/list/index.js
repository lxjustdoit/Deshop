require('page/common/nav-com/index.js');
require('page/common/header/index.js');
require('./index.css');

var _ds = require('util/dtools.js');
var _product = require('service/product-service.js');
var templateIndex = require('./index.string');
var Pagination = require('util/pagination/index.js');

var page={
    data:{
        listParam:{
            keyword: _ds.getUrlParam('keyword') || '',
            categoryId: _ds.getUrlParam('categoryId') || '',
            order: _ds.getUrlParam('order') || 'default',
            pageNum: _ds.getUrlParam('pageNum') || 1,
            pageSize: _ds.getUrlParam('pageSize') || 20
        }
    },
    init:function(){
        this.onload();
        this.bindEvent();
    },
    onload:function(){
        this.loadList();
    },
    bindEvent:function(){
        var _this = this;
        $('sort-item').click(function(){
            var $this = $(this);
            _this.data.listParam.pageNum = 1;
            //default order
            if($(this.data('type')) === 'default'){
                //already is active 
                if($this.hasClass('active')){
                    return;
                }else{
                    $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            }
            //order by price
            else if($(this.data('type')) === 'price'){
                //add active to order by price
                $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
                if(!$this.hasClass('asc')){
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                }else{
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            _this.loadList(); 
        });
    },
    loadList:function(){
        var _this = this;
            listHtml = '';
            listParam = this.data.listParam;
            $pListCon = $('.p-list-con');
        $pListCon.html('<div class="loading"></div>');    
        //delete unecessary param
        listParam.categoryId 
        ? (delete listParam.keyword) : (delete listParam.categoryId);
        //request interface
        _product.getProductList(listParam,function(){
            listHtml = _ds.renderHtml(templateIndex, {
                list: res.list
            });
            $pListCon.html(listHtml);
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                hasNextPage: res.hasNextPage,
                pageNum: res.pageNum,
                pages: res.pages,
            });
        },function(errMsg){
            _ds.errorTips(errMsg);
        })
    },
    //load pagination information
    loadPagination:function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }))
    }
};
$(function(){

})