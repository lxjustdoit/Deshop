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
        //validate username
        $('#username').blur(function(){
            var username = $.trim($(this).val());
            if(!username){
                return;
            }
            _user.checkUsername(username, function(res){
                formError.hide();
            }, function(errMsg){
                formError.show(errMsg);
            });
        });
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
            username        : $.trim($('#username').val()),
            password        : $.trim($('#password').val()),
            passwordConfirm : $.trim($('#password-confirm').val()),
            phone           : $.trim($('#phone').val()),
            email           : $.trim($('#email').val()),
            question        : $.trim($('#question').val()),
            answer          : $.trim($('#answer').val()),
        },
        //validation result
        validateResult = this.formValidate(formData);
        //validate successfully 
        if(validateResult.status){
            //submit 
            _user.register(formData, function(res){
                window.location.href = './result.html?type=register';
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
        if(formData.password.length < 6){
            result.msg = 'At least 6 digits';
            return result;
        }
        if(formData.password != formData.passwordConfirm){
            result.msg = 'Password should be same';
            return result;
        }
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
    }
};
$(function(){
    page.init();
})