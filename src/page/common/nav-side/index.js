require('./index.css');

var templateIndex = require('./index.string');
var _ds = require('util/dtools.js');
var navSide = {
    option:{
        name:'',
        navList:[
            {name:'My DeShop', desc:'My Deshop', href:'./user-center.html'},
            {name:'My Order', desc:'Order', href:'./uer-order.html'},
            {name:'Password', desc:'Password-reset', href:'./user-pass-update.html'},
            {name:'About DeShop', desc:'About', href:'./about.html'},
    ]
    },
    init:function(option){
        //combine selection
        $.extend(this.option, option);
        this.renderNav();
    },
    renderNav:function(){
        for(var i = 0, iLength = this.option.navList.length; i<iLength; i++){
            if(this.option.navList[i].name === this.option.name){
                this.option.navList[i].isActive = true;
            }
        };
        //render nav-list 
        var navHtml = _ds.renderHtml(templateIndex,{
            navList:this.option.navList
        });
        $('.nav-side').html(navHtml);
    }
};
module.exports = navSide;