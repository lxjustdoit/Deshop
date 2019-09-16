require('./index.css');
var templatePagination = require('./index.string');
var _ds = require('util/dtools.js');

var Pagination = function(){
    var _this = this;
    this.defaultOption = {
        container: null,
        pageNum: 1,
        pageRange: 3,
        onSelectPage: null
    };
    $(document).on('click', '.pg-item', function(){
        var $this = $(this);
        //active and disabled do not have action 
        if($this.hasClass('active') || $this.hasClass('disabled')){
            return;
        }
        typeof _this.option.onSelectPage === 'function'
        ? _this.option.onSelectPage($this.data('value')) : null;
    })
}
//render pagination, prototype is used for other instance extend 
Pagination.prototype.render = function(userOption) {
    this.option = $.extend({}, this.defaultOption, userOption);
    //whether container is legal
    if(!(this.option.container instanceof jQuery)){
        return;
    }
    //if number of page is 1, do nothing
    if(this.option.pages <= 1){
        return;
    }   
    this.option.container.html(this.getPaginationHtml());
}
Pagination.prototype.getPaginationHtml = function(){
    var html = '';
        option = this.option,
        pageArray = [],
        start = option.pageNum - option.pageRange >0
        ? option.pageNum - option.pageRange : 1,
        end = option.pageNum + option.pageRange < option.pages
        ? option.pageNum + option.pageRange : option.pages;
    //data of pre page
    pageArray.push({
        name: 'Pre',
        value: this.option.prePage,
        disable: !this.option.hasPreviousPage,
        
    });
    //page number action
    for(var i = start; i<=end; i++){
        pageArray.push({
            name: i,
            value: i,                       
            active: (i === option.pageNum)
        });
    };
    pageArray.push({
        name: 'Next',
        value: this.option.nextPage,
        disable: !this.option.hasNextPage,
        
    });
    html = _ds.renderHtml(templatePagination, {
        pageArray: pageArray,
        pageNum: option.pageNum,
        pages: option.pages
    });
    return html;
}
module.exports = Pagination;