(function() {
    const GUI = require('nw.gui'),
          WIN = GUI.Window.get();
    ybq.windowBehavior = {
        init: function() {
            console.info(this);
            WIN.on('close', function() {
                if (localStorage && !isNaN(localStorage.closeType)) {
                    this.closeByType(localStorage.closeType);
                    return;
                }
                this.modal = new (ybq.BModal1)({
                    title: '选择关闭行为',
                    content: `<div>
                                 <p>
                                    <input type="radio" name="close-type" value="0" id="direct-exit">
                                    <label for="direct-exit">直接退出</label>
                                 </p>
                                 <p>
                                    <input type="radio" name="close-type" value="1" id="minimize">
                                    <label for="minimize">最小化到托盘</label>
                                 </p>
                                 <label>
                                    <input type="checkbox" id="remember-choice">
                                    记住我的选择
                                </label>
                              </div>`,
                    onConfirm: function() {
                        var checkedItem = $('[name="close-type"]:checked');
                        if (!checkedItem.length) {
                            ybq.showTip('请选择窗口关闭时的行为', true);
                            return;
                        }
                        var val = checkedItem.val();
                        $('#remember-choice')[0].checked && (localStorage.closeType = val);
                        this.closeByType(val);
                    }.bind(this)
                });
                // WIN.close(true);
            }.bind(this));
        },
        closeByType: function(type) {
            this.modal && this.modal.remove();
            switch(+type) {
                case 0:
                    WIN.close(true);
                    return;
                case 1:
                    WIN.hide();
                    var tray = new GUI.Tray({
                        icon: 'img/tray.png'
                    });
                    tray.on('click', function() {
                        WIN.show();
                        this.remove();
                        tray = null;
                    });
                    return;
                default:
                    console.error(`Invalid close type:${type}`);
            }
        }
    };
}());
