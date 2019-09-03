require('./index.css');

var _ds = require('util/dtools.js');
//common header
var header = {
    init:function(){
        this.bindEvent();
    },
    onload:function(){
        var keyword = _ds.getUrlParam('keyword');
        //if keyword exists, refill input area
        if(keyword){
            $('#search-input').val(keyword);
        }
    },
    bindEvent:function(){
        var _this = this;
        //click search button, submit the search request 
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        //type enter key to submit search
        $('#search-input').keyup(function(e){ //e is a callback 
            //13 is enter
            if(e.keyCode === 13){
                _this.searchSubmit(); 
            }
        })
    },
    searchSubmit:function(){
        var keyword = $.trim($('#search-input').val());
        //if keyword exist, go to list page
        if(keyword){
            window.location.href = '/list.html?keyword=' + keyword;
        }else{ //if no keyword, go to  home page
            _ds.goHome();
        }
    }
};
header.init(); //no exports functions, so no need for module.exports