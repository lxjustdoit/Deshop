require('./index.css');
require('page/common/nav-com/index.js');
require('page/common/header/index.js');

var _ds = require('util/dtools.js');
var _product = require('service/product-service.js');
var _cart = require('service/cart-service.js')
var templateIndex = require('./index.string');

var page={
    data:{
        productId: _ds.getUrlParam('productId') || ''
    },
    init:function(){
        this.onload();
        this.bindEvent();
    },
    onload:function(){
        if(this.data.productId){
            _ds.goHome();
        }
        this.loadDetail();
    },
    bindEvent:function(){
        var _this = this;
        //pic preview, jquery in this version could not use read as mouse over
        $(document).on('mouseenter', '.p-img-item', function(){
            var imgUrl = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imgUrl);
        });
        //count action
        $(document).on('click', '.p-count-btn', function(){
            var type = $(this).hasClass('plus') ? 'plus' : 'minus',
                $pCount = $('.p-count'),
                currCount = parseInt($pCount.val()),
                minCount = 1,
                maxCount = _this.date.detailInfo.stock || 1;
            if(type === 'plus'){
                $pCount.val(currCount < maxCount ? currCount+1 : maxCount);
            }
            else if(type === 'minus'){
                $pCount.val(currCount > minCount ? currCount-1 : minCount);
            }
        });
        //cart operation
        $(document).on('click', '.cart-add', function(){
            _cart.addToCart({
                productId: _this.data.productId,
                count: $('.p-count').val()
            }, function(res){
                window.location.href = './result/html?type=cart-add';
            }, function(errMsg){
                _ds.errorTips(errMsg);
            });
        })
    },
    loadDetail:function(){
        var html = '',
            _this = this,
            $pageWrap = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        _product.getProductDetail(this.data.productId, function(res){
            _this.filter(res);
            _this.data.detailInfo = res; //store detail data
            html = _ds.renderHtml(templateIndex, res);
            $pageWrap.html(html);
        }, function(errMsg){    
            $pageWrap.html('<p class="err-tip">No Result Found</p>');
        })
    },
    filter:function(data){
        data.subImages = data.subImages.split(',');
    }
}
$(function(){
    page.init();
})