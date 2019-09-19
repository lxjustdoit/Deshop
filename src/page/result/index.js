require('./index.css');
require('page/common/nav/index.js');

var _ds = require('util/dtools.js');
//display notice page
$(function(){
    var type = _ds.getUrlParam('type') || 'default',
        $element = $('.' +type+ '-success');
    if(type === 'payment'){
        var orderNumber = _ds.getUrlParam('orderNumber'),
            $orderNumber = $element.find('.order-number');
        $orderNumber.attr('href', $orderNumber.attr('href')+orderNumber);
    }
    $element.show();
})