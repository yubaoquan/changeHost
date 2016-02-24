(function() {
    function Tooltips(args) {
    }

    Tooltips.prototype = {
        init: function() {
            this.tooltips = $([
                '<div class="m-tooltipsWrapper">',
                    '<div class="content">',
                        'tooltip',
                    '</div>',
                    '<div class="arrow"></div>',
                '</div>'
            ].join(''));
            $('body').append(this.tooltips);
            this.titleWrapper = this.tooltips.children('.content');
            this.w = this.tooltips.width();
            this.h = this.tooltips.height() + 10;
        },
        show: function(args) {
            if (!this.tooltips) {
                this.init();
            }
            this.titleWrapper.text(args.title);
            this.w = this.tooltips.width();
            this.tooltips.css({
                left: (args.x + 0.5 * (args.w - this.w)) + 'px',
                top: (args.y - this.h) + 'px'
            });
            this.tooltips.show();
        },
        hide: function() {
            this.tooltips.hide();
        },
        find: function() {
            this.tooltips.find.apply(this.tooltips, arguments);
        }
    }

    var tooltips = new Tooltips();

    $('.tooltips').on('mouseover', function(e) {
        var targetElement = $(e.target);
        var offset = targetElement.offset();
        tooltips.show({
            title: targetElement.attr('title'),
            x: offset.left,
            y: offset.top,
            w: targetElement.width(),
            h: targetElement.height()
        });
    });

    $('.tooltips').on('mouseleave', function(e) {
        //鼠标落到箭头的boder-bottom上, 不隐藏tooltips
        if (tooltips.find(e.currentTarget)) {
            return;
        }
        tooltips.hide();
    });
}());
