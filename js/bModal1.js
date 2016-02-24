(function() {
    function BModal1() {

    }

    BModal1.prototype = {
        init: function() {
            this.modal = $([
                '<div id="b-modal1" class="m-bModal1">',
                    '<div class="modal">',
                        '<div class="header">',
                            '<div class="title">title</div>',
                            '<div class="x f-close"></div>',
                        '</div>',
                        '<div class="body">',
                            '<div class="icon"></div>',
                            '<div class="content">',
                                'There are some fucking contents.',
                            '</div>',
                        '</div>',
                        '<div class="buttons">',
                            '<button class="button activeButton f-close">OK</button>',
                            '<button class="button f-close">Cancel</button>',
                        '</div>',
                    '</div>',
                '</div>'
            ].join(''));
            $('body').prepend(this.modal);
            var modal = this.modal;
            this.modal.find('.f-close').click(function() {
                modal.hide();
            });
        },
        show: function(args) {
            if (!this.modal) {
                this.init();
            } else {
                this.modal.show();
            }
        }
    };

    window.BModal1 = new BModal1();
    $('#fuck-modal').click(function() {
        window.BModal1.show();
    });
}());
