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
        this.bindEvent();
    },
    bindEvent:function(){
        var _this = this;
        //after click submit
        $(document).on('click', 'btn-submit',function(){
            var userInfo = {
                phone: $.trim($('#phone').val()),
                email: $.trim($('#email').val()),
                question: $.trim($('#question').val()),
                answer: $.trim($('#answer').val()),
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                _user.updateUserInfo(userInfo, function(res,msg){
                    _ds.successTips(msg);
                    window.location.href = './user-center.html';
                }, function(errMsg){
                    _ds.errorTips(errMsg);
                });
            }else{
                _ds.errorTips(validateResult.errMsg);
            }
        })
    },
    validateForm:function(formData){
            var result = {
                status:false,
                msg:'',
            };
            if(!_ds.validate(formData.phone, 'phone')){
                result.msg = 'You must provide a phone';
                return result;
            }
            if(!_ds.validate(formData.email, 'email')){
                result.msg = 'You must provide a email';
                return result;
            }
            if(!_ds.validate(formData.question, 'require')){
                result.msg = 'You must provide a question';
                return result;
            }
            if(!_ds.validate(formData.answer, 'require')){
                result.msg = 'You must provide a answer';
                return result;
            }
            //validate success
            result.status = true;
            result.msg = 'Sucess!';
            return result;
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
}
$(function(){
    page.init();
})