import jQuery from 'jquery';
window.$ = jQuery;

console.log('loaded index.js');

$(function () {
    $('button').click(function () {
        var $p = $('.all');
        $p.stop()
            .css('background-color', 'yellow')
            .hide(500, function () {
                $p.css('background-color', 'red')
                    .show(500);
            });
    });
});
