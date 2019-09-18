require('./index.css');
require('page/common/header/index.js');
require('page/common/nav-com/index.js');
var _ds = require('util/dtools.js');
var _order = require('service/order-service.js');
var _address = require('service/address-service.js');
var templateProduct = require('./product-list.string');
var templateAddress = require('./address-list.string');
var addressModal = require('./address-modal.js');

var page={
    data:{
        selectedAddressId : null
    },
    init:function(){
        this.onload();
        this.bindEvent();
    },
    onload:function(){
        this.loadAddressList();
        this.loadProductList();

    },
    bindEvent:function(){
        var _this = this;
        //select address
        $(document).on('click', '.address-item', function(){
            $(this).addClass('active')
                    .sibling('.address-item').removeClass('active');
            _this.data.selectedAddressId = $(this).data('id');
        });
        //order submit
        $(document).on('click', '.order-submit', function(){
            var shippingId = _this.data.selectedAddressId;
            if(shippingId){
                _order.createOrder({
                    shippingId :shippingId
                }, function(res){
                    window.location.href = './payment.html?orderNumber=' + res.orderNo;
                }, function(errMsg){
                    _ds.errorTips(errMsg)
                })
            }else{
                _ds.errorTips('You need to select a valid address')
            }
        });
        //add new address
        $(document).on('click', '.address-add', function(){
            addressModal.show({
                isUpdate: false,
                onSuccess: function(){
                    _this.loadAddressList();
                }
            });
        })
        //update new address
        $(document).on('click', '.address-update', function(e){
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            _address.getAddress(shippingId, function(res){
                addressModal.show({
                    isUpdate: true,
                    data:res,
                    onSuccess: function(){
                        _this.loadAddressList();
                    }
                });
            }, function(errMsg){
                _ds.errorTips(errMsg);
            })
        });
        //delete adderss
        $(document).on('click', '.address-delete', function(e){
            e.stopPropagation();
            var id = $(this).parents('address-item').data('id');
            if(window.confirm('Are you sure to delete this address?')){
                _address.deleteAddress(id, function(res){
                    _this.loadAddressList();
                }, function(errMsg){
                    _ds.errorTips(errMsg);
                });
            }
        })
    },
    loadAddressList:function(){
        var _this = this;
        $('.address-con').html('<div class="loading"></div>');
        //get address list
        _address.getAddressList(function(res){
            _this.addressFilter(res);
            var addressHtml = _ds.renderHtml(templateAddress, res);
            $('.address-con').html(addressHtml);
        }, function(errMsg){  
            $('.address-con').html('<p class="err-tips">Loading failure, please try again</p>')
        })
    },
    //action when you select an address
    addressFilter:function(data){
        if(this.data.selectedAddressId){
            var selectedAddressIdFlag = false;
            for(var i = 0, length = data.list.length; i<length; i++){
                if(data.list[i].id === this.data.selectedAddressId){
                    data.list[i].isActive = true;
                    selectedAddressIdFlag = true; 
                }
            };
            //if the address choose before is not in the list, then delete it
            if(!selectedAddressIdFlag){
                this.data.selectedAddressId = null;
            }
        }
    },
    //load product list
    loadProductList:function(){
        var _this = this;
        $('.product-con').html('<div class="loading"></div>');
        //get address list
        _order.getProductList(function(res){
            var productHtml = _ds.renderHtml(templateProduct, res);
            $('.product-con').html(productHtml);
        }, function(errMsg){  
            $('.product-con').html('<p class="err-tips">Loading failure, please try again</p>')
        })
    },
}
$(function(){
    page.init();
});