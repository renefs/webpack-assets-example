import jQuery from 'jquery';
window.$ = jQuery;
require('./index.css');

$(function () {
    $("button").click(function () {
        var $p = $(".all");
        $p.stop()
            .css("background-color", "yellow")
            .hide(500, function () {
                $p.css("background-color", "red")
                    .show(500);
            });
    });
});
