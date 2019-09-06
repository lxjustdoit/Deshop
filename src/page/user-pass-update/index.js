require('../module.js');
require('page/common/nav-com/index.js');
require('page/common/header/index.js');
require('./index.css');
var navSide = require('page/common/nav-side/index.js');

var _ds = require('util/dtools.js');
var _user = require('service/user-service.js');
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
                password: $.trim($('#password').val()),
                passwordNew: $.trim($('#password-new').val()),
                passwordConfirm: $.trim($('#password-confirm').val()),
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                _user.updatePassword(
                    {
                        passwordOld: userInfo.password,
                        passwordNew: userInfo.passwordNew,
                    }, function(res,msg){
                    _ds.successTips(msg);
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
            if(!_ds.validate(formData.password, 'require')){
                result.msg = 'You must provide a password';
                return result;
            }
            if(formData.passwordNew || formData.passwordNew.length < 6){
                result.msg = 'Your password should be at least 6 digits';
                return result;
            }
            if(formData.passwordNew != formData.passwordConfirm){
                result.msg = 'Your password should be same';
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
            name: 'user-pass-update',
        });
    },
}
$(function(){
    page.init();
})