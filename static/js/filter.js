jQuery(function($) {
    'use strict';
    
    // The Filterizr
    $(window).on('load', function(e) {
        $('.filter-container').filterizr({
            layout: 'packed'
        });
    });

}(jQuery));