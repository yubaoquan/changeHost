(function() {
    var noop = function() {};
    function BModal1(args) {
        this.title = args.title;
        this.content = args.content;
        this.onConfirm = args.onConfirm || this.remove;
        this.onCancel = args.onCancel || this.remove;
        this.init();
    }

    BModal1.prototype = {
        init: function() {
            this.modal = $(
                `<div id="b-modal1" class="m-bModal1">
                    <div class="modal">
                        <div class="header">
                            <div class="title">
                                ${this.title || ''}
                            </div>
                            <div class="x f-close"></div>
                        </div>
                        <div class="body">
                            <div class="icon"></div>
                            <div class="content">
                                ${this.content}
                            </div>
                        </div>
                        <div class="buttons">
                            <button class="button activeButton f-close">OK</button>
                            <button class="button f-close">Cancel</button>
                        </div>
                    </div>
                </div>`);

            $('body').prepend(this.modal);
            this.closeBtns = this.modal.find('.f-close');
            this.closeBtn = this.closeBtns[0];
            this.confirmBtn = this.closeBtns[1];
            this.cancelBtn = this.closeBtns[2];
            this.registerListeners();
        },
        registerListeners: function() {
            $(this.closeBtn).click(this.remove.bind(this));
            $(this.confirmBtn).click(this.onConfirm.bind(this));
            $(this.cancelBtn).click(this.onCancel.bind(this));
        },
        remove: function() {
            this.closeBtns.off('click');
            this.modal.remove();
        }
    };

    ybq.BModal1 = BModal1;
}());
