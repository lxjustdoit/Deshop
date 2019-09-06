require('../module.js');
require('./index.css');
require('page/common/nav/index.js');

var _ds = require('util/dtools.js');
var _user = require('service/user-service.js');
//error information in form
var formError = {
    show:function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide:function(){
        $('.error-item').hide().find('.err-msg').text();
    },

};
var page = {
    init:function(){
        this.bindEvent();

    },
    bindEvent:function(){
        var _this = this;
        $('#submit').click(function(){
            _this.submit();
        });
        //press enter to submit
        $('.user-content').keyup(function(e){
            if(e.keyCode === 13){
                _this.submit();
            }
        });
    },
    submit:function(){
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        },
        //validation result
        validateResult = this.formValidate(formData);
        //validate successfully 
        if(validateResult.status){
            //submit
            _user.login(formData, function(res){
                window.location.href = _ds.getUrlParam('redirect') || './index.html';
            },function(errMsg){
                formError.show(errMsg);
            });
        }
        //validate fail
        else{
            formError.show(validateResult.msg);
        }
    },
    formValidate:function(formData){
        var result = {
            status:false,
            msg:'',
        };
        if(!_ds.validate(formData.username, 'require')){
            result.msg = 'You must provide a username';
            return result;
        }
        if(!_ds.validate(formData.password, 'require')){
            result.msg = 'You must provide a password';
            return result;
        }
        //validate success
        result.status = true;
        result.msg = 'Sucess!';
        return result;
    }
};
$(function(){
    page.init();
})