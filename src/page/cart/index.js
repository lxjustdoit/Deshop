require('./index.css');
require('page/common/header/index.js');

var nav = require('page/common/nav-com/index.js');
var _ds = require('util/dtools.js');
var _cart = require('service/cart-service.js')
var templateIndex = require('./index.string');

var page={
    data:{
        
    },
    init:function(){
        this.onload();
        this.bindEvent();
    },
    onload:function(){
        this.loadCart();
    },
    bindEvent:function(){
        var _this = this;
        //choose a product / cancle selection
        $(document).on('click', '.cart-select', function(){
            var $this = $(this),
                productId = $this.parents('.cart-table').data('product-id');
            // checked
            if($this.is(':checked')){
                _cart.selectProduct(productId, function(res){
                    _this.renderCart(res);
                }, function(errMsg){    
                    _this.showCartError();
                });
            }
            else{
                _cart.unselectProduct(productId, function(res){
                    _this.renderCart(res);
                }, function(errMsg){    
                    _this.showCartError();
                });
            }

        });
        //select all / cancle 
        $(document).on('click', '.cart-select-all', function(){
            var $this = $(this);
            // checked
            if($this.is(':checked')){
                _cart.selectAllProduct(function(res){
                    _this.renderCart(res);
                }, function(errMsg){    
                    _this.showCartError();
                });
            }
            else{
                _cart.unselectAllProduct(function(res){
                    _this.renderCart(res);
                }, function(errMsg){    
                    _this.showCartError();
                });
            }

        });
        $(document).on('click', '.count-btn', function(){
            var $this = $(this),
                $pCount = $this.siblings('.count-input'),
                currCount = parseInt($pCount.val()),
                type = $this.hasClass('plus') ? 'plus' : 'minus', 
                productId = $this.parents('.cart-table').data('product-id'),
                minCount = 1,
                maxCount = parseInt($pCount.data('max')),
                newCount = 0;
            if(type === 'plus'){
                if(currCount >= maxCount){
                    _ds.errorTips('Product out of stock');
                    return;
                }
                newCount = currCount + 1;
            }else if(type === 'minus'){
                if(currCount <= maxCount){
                    return;
                }
                newCount = currCount - 1;
            }
            //update product number
            _cart.updateProduct(
                {
                productId : productId,
                count : newCount,
            }, function(res){
             _this.renderCart(res);
            }, function(errMsg){    
            _this.showCartError();
            });
        }),
        //cart operation
        $(document).on('click', '.cart-add', function(){
            _cart.addToCart({
                productId: _this.data.productId,
                count: $('.p-count').val()
            }, function(res){
                window.location.href = './result/html?type=cart-add';
            }, function(errMsg){
                _ds.errorTips(errMsg)
            });
        }),
        //delete one item
        $(document).on('click', '.count-delete', function(){
            if(window.confirm('Are you sure to delete this item?')){
                var productId = $(this).parents('.cart-table')
                    .data('product-id');
                _this.deleteCartProduct(productId);
            }
        });
        //delete selected items
        $(document).on('click', '.count-delete', function(){
            if(window.confirm('Are you sure to delete selected items?')){
                var arrProductIds = [],
                    $selectedItem = $('.cart-selected:checked');
                //iterate product ids in array
                for(var i = 0, iLength = $selectedItem.length; i < iLength; i++){
                    arrProductIds.push($($selectedItem[i]
                            .parents('.cart-table').data('product-id')));
                }
                if(arrProductIds.length){
                    _this.deleteCartProduct(arrProductIds.join(','));
                }else{
                    _ds.errorTips('You have not selected items');
                }
            }
        });
        //checkout
        $(document).on('click', '.btn-submit', function(){
            //total price > 0, submit it
            if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice>0){
                window.location.href = './confirm.html';
            }else{
                _ds.errorTips('Please items you like');
            }
        });
    },
    //load cart information
    loadCart:function(){
        var _this = this;
        //get cart list
        _cart.getCartList(function(res){
            _this.renderCart(res);
        }, function(errMsg){  
            _this.showCartError();  
        })
    },
    renderCart:function(data){
        this.filter(data);
        //store cart information 
        this.data.cartInfo = data;
        var cartHtml = _ds.renderHtml(templateIndex, data);
        $('.page-wrap').html(cartHtml);
        //update cart number in nav-com
        nav.loadCartCount();
    },
    deleteCartProduct:function(productIds){
        var _this = this;
        _cart.deleteCartProduct(productIds, function(res){
        _this.renderCart(res);
        }, function(errMsg){    
        _this.showCartError();
        });
    },
    showCartError:function(){
        $('.page-wrap').html('<p class="err-tip">Something wrong, try it again</p>')
    },
    filter:function(data){
        data.notEmpty = !!data.cartProductVoList.length;
    }
}
$(function(){
    page.init();
})