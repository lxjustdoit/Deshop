var _ds = require('util/dtools.js');
var _address = require('service/address-service.js');
var _cities = require('util/cities/index.js')
var templateAddressModal = require('./address-modal.string');

var addressModal={
    show: function(option){
    //bind option
        this.option = option;
        this.option.data = option.data || {};
        this.$modalWrap = $('.modal-wrap');
    //render page
        this.loadModal();
    //bind event
        this.bindEvent();
    },
    bindEvent:function(){
        var _this = this;
        this.$modalWrap .find('#receiver-province').change(function(){
            var selectedProvince = $(this).val();
            _this.loadCities(selectedProvince); 
        });
        this.$modalWrap .find('.adderss-btn').click(function(){
            var receiverInfo = _this.getReceiverInfo();
                isUpdate = _this.option.isUpdate;
                //use new address and validated 
                if(!update && receiverInfo.status){
                    _address.save(receiverInfo.data, function(res){
                        _ds.successTips('New address added');
                        _this.hide();
                        typeof _this.option.onSuccss === 'function' 
                            && _this.option.onSuccess(res);
                    }, function(errMsg){
                        _ds.errorTips(errMsg);
                    });
                }
                //update receiver information
                else if (isUpdate && receiverInfo.status){
                    _address.update(receiverInfo.data, function(res){
                        _ds.successTips('New address updated');
                        _this.hide();
                        typeof _this.option.onSuccss === 'function' 
                            && _this.option.onSuccess(res);
                    }, function(errMsg){
                        _ds.errorTips(errMsg);
                    });
                }
                //validation failed
                else{
                    _ds.errorTips(receiverInfo.errMsg || "Something wrong");
                }
        });
        //when you click other part of contauiner will not close window
        this.$modalWrap .find('.modal-container').click(function(e){
            e.stopPropagation();
        });
        //close window
        this.$modalWrap .find('.close').click(function(){
            _this.hide(); 
        });

    },
    loadModal:function(){
        var addressModalHtml = _ds.renderHtml(templateAddressModal, 
            {isUpdate:this.option.isUpdate,
             data: this.option.data
            });
        this.$modalWrap.html(addressModalHtml);
        //load province, city
        this.loadProvince();
        
    },
    loadProvince:function(){
        var provinces = _cities.getProvinces() || [],
            $provinceSelect = this.$modalWrap.find('#receiver-province');
        $provinceSelect.html(this.getSelectOption(provinces));
        //update adderss, if there is an province, refill the form
        if(this.option.data.isUpdate && this.option.data.receiverProvince){
            $provinceSelect.val(this.option.data.receiverProvince);
            this.loadCities(this.option.data.receiverProvince);
        }
    },
    loadCities:function(provinceName){
        var cities = _cities.getCities(provinceName) || [],
            $citySelect = this.$modalWrap.find('#receiver-city');
        $citySelect.html(this.getSelectOption(cities));
        //if there is a city, refill the form
        if(this.option.data.isUpdate && this.option.data.receiverProvince){
            $citySelect.val(this.option.data.receiverCity);
        }
    },
    //get receiver infomation and validate it
    getReceiverInfo:function(){
        var receiverInfo = {},
            result = {
                status:false
            };
        receiverInfo.receiverName = $.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince = this.$modalWrap.find('#receiver-province').val();
        receiverInfo.receiverCity = this.$modalWrap.find('#receiver-city').val();
        receiverInfo.receiverPhone = $.trim(this.$modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverAddress = $.trim(this.$modalWrap.find('#receiver-address').val());
        receiverInfo.receiverZip = $.trim(this.$modalWrap.find('#receiver-zip').val());

        if(this.option.isUpdate){
            receiverInfo.id = this.$modalWrap.find('#receiver-id').val();
        }

        //form validate
        if(!receiverInfo.receiverName){
            result.errMsg = 'Please enter receiver name';
        }else if(!receiverInfo.receiverProvince){
            result.errMsg = 'Please choose destination province';
        }else if(!receiverInfo.receiverCity){
            result.errMsg = 'Please choose destination city';
        }else if(!receiverInfo.receiverPhone){
            result.errMsg = 'Please enter receiver phone number';
        }else if(!receiverInfo.receiverAddress){
            result.errMsg = 'Please enter receiver address';
        }else {
            result.status = true;
            result.data = receiverInfo;
        }
        return result;
    },
    //get select items
    getSelectOption:function(optionArray){
        var html = '<option value="">Choose</option>';
        for(var i = 0; length=optionArray.length; i<length, i++){
            html += '<option value="'+ optionArray[i] +'">'+ optionArray[i] +'</option>';
        }
        return  html;
    },
    //close window
    hide: function(){
        this.$modalWrap.empty();
    }
}
module.exports = addressModal;