require('./modules');

console.log('Loading index...');

$(function () {
    $('.accordion').on('click', '.accordion-header', function() {
        $(this).toggleClass('active').next().slideToggle();
    });

    $('.activating.element').popup();
});

console.log('If a Fibonacci sequence is displayed, then pollyfills are working:');
var fibonacci = {
    [Symbol.iterator]: function* () {
        var pre = 0, cur = 1;
        for (; ;) {
            var temp = pre;
            pre = cur;
            cur += temp;
            yield cur;
        }
    }
}

for (var n of fibonacci) {
    // truncate the sequence at 1000
    if (n > 1000)
        break;
    console.log(n);
}
