(function() {
    $('.building').click(function() {
        alert('建设中...');
    });

    function showTip(msg, error) {
        var tipContainer = $('#tip-container');
        if (tipContainer.length == 0) {
            tipContainer = $('<div id="tip-container" style="position: absolute; width: 100%; "></div>');
            $('body').prepend(tipContainer);
        }

        var tip = $('<div class="tip">' + msg + '</div>');
        error && tip.css({
            'background-color': 'red'
        });
        tipContainer.prepend(tip);

        tipContainer.children().each(function(index, item) {
            item.style.marginTop = 60 * index + 'px';
        });
        setTimeout(function() {
            tip.addClass('transition');
        }, 0);
        setTimeout(function() {
            tip.css('opacity', 0);
        }, 1000);
        setTimeout(function() {
            tip.remove();
        }, 2000);
    }
    ybq.showTip = showTip;
}());
