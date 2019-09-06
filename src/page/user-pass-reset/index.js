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
    data:{
        username:'',
        question:'',
        answer:'',
        token:'',
    },
    init:function(){
        this.onload();
        this.bindEvent();

    },
    onload:function(){
        this.loadStepUsername();
    },
    bindEvent:function(){
        var _this = this;
        $('#submit-username').click(function(){
            var username = $.trim($('#username').val());
            if(username){
                _user.getQuestion(username, function(res){
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                }, function(errMsg){
                    formError.show(errMsg);
                })
            }
            else{
                formError.show('You must provide a username');
            }
        });
        //press enter to submit
        $('.user-content').keyup(function(e){
            if(e.keyCode === 13){
                _this.submit(); 
            }
        });
        //question step button click
        $('#submit-question').click(function(){
            var answer = $.trim($('#answer').val());
            if(answer){
                //check security question answer
                _user.checkAnswer({
                    username:_this.data.username,
                    question:_this.data.question,
                    answer: answer,
                }, function(res){ //answer is correct
                    _this.data.username = username;
                    _this.data.token = res;
                    _this.loadStepPassword();
                }, function(errMsg){
                    formError.show(errMsg);
                })
            }
            else{
                formError.show('You must provide an answer');
            }
        });
        $('#submit-password').click(function(){
            var password = $.trim($('#password').val());
            if(password && password.length > 6){
                //check security question answer
                _user.resetPassword({
                    username:_this.data.username,
                    newPassword: password,
                    forgetToken: _this.data.token,
                }, function(res){ //answer is correct
                    window.location.href = './result.html?type=pass-reset';
                }, function(errMsg){
                    formError.show(errMsg);
                })
            }
            else{
                formError.show('You must provide a 6 digtis password');
            }
        });
    },
    //load username step
    loadStepUsername:function(){
        $('.step-username').show();
    },
    loadStepPassword:function(){
        //hide error message
        formError.hide();
        //go to next step
        $('.step-username').hide()
            .siblings('.step-question').show()
            .find('.question').text(this.data.question);
    },  
    loadStepQuestion:function(){
        //hide error message
        formError.hide();
        //go to next step
        $('.step-question').hide()
            .siblings('.step-password').show();
    }

};
$(function(){
    page.init();
})