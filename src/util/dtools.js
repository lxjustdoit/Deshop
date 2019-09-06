var hogan = require('hogan.js');
var conf = {
    serverHost : ''
};
var _ds = {
    request: function(param){  //backend interface
        var _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function(res){
                //req success
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data, res.msg) //whether its a callback function   
                }
                //not login
                else if(10 === res.status){
                    _this.doLogin();
                }
                //data error
                else if(1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg)
                }
            },
            error: function(err){
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    //get server url
    getServerUrl: function(path){
        return conf.serverHost + path;
    },
    //get param of url 
    getUrlParam: function(name){
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result? decodeURIComponent(result[2]) : null;
    },  
    //render html template
    renderHtml: function(htmltemplate,data){
        var template = hogan.compile(htmltemplate),
            result = template.render(data);
        return result;
    },
    //success reminder
    successTips: function(msg){
        alert(msg || 'Success!')
    },
    //error reminder 
    errorTips: function(msg){
        alert(msg || 'Something wrong?')
    },
    //number emial validation 
    validate: function(value,type){
        var value = $.trim(value);
        //null validation
        if('require' === type){
            return  !!value;
        }
        //phone number validation
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        //email validation
        if('email' === type){
            return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
        }
    },
    //login redirect
    doLogin: function (){
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    //homepage redirect
    goHome: function(){
        window.location.href = './index.html';
    }
};
module.exports = _ds;