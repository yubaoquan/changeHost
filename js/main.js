(function() {

    var selectedHost,
        currentHostName = 'x';
    const basePath = 'C:/Windows/System32/drivers/etc';
    /**
     * 显示当前目录下的hosts文件
     * @param  {Array} hostsNames 文件名数组
     * @return {[type]}            [description]
     */
    function showHosts(path) {
        var ul = $('.m-hosts ul');
        ybq.listFiles(path)
        .then(function(files) {
            files.forEach(function(item, index) {
                if (item.indexOf('hosts_') != 0) {
                    return;
                }
                var jqItem = $(`<li class="item">${item}</li>`);
                jqItem.on('click', function() {
                    onHostsClick(jqItem);
                });
                ul.append(jqItem);
            });
        });
    }
    /**
     * 用户点击host图标时, 切换到该host
     * @param  {jq} jqItem   图标节点的jq对象
     */
    function onHostsClick(jqItem) {
        var hostName = jqItem.text().substr(6);
        ybq.setHosts(hostName, function(configData) {
            ybq.showTip(`已将host切换到${hostName}`);
            selectedHost.removeClass('selected');
            jqItem.addClass('selected');
            selectedHost = jqItem;
            showHostData(configData);
        });
    }

    /**
     * 在页面上打印hosts配置
     */
     function showHostData(data) {
         var showArea = $('.m-hostContent');
         showArea.empty();
         data.split('\n').forEach(function(item, index) {
             showArea.append(`<p>${item}</p>`);
         });
     }

    /**
     * 根据hosts文件第一行的内容判断属于哪个host
     * @param  {String} fileName [description]
     * @return {[type]}          [description]
     */
    function findSelectedHost() {
        ybq.readline('C:/Windows/System32/drivers/etc/hosts', 0, function(line) {
            line = line.replace(/\s+/g, '');
            if (line.length < 2) {
                ybq.showTip(`hosts的第一行备注不合法, 请检查`);
                return;
            }
            currentHostName = line.substr(1);
            $('.m-hosts li').each(function(index, item) {
                item = $(item);
                var host = item.text().substr(6);
                if (currentHostName == host) {
                    item.addClass('selected');
                    selectedHost = item;
                }
            });
        });
        ybq.readFile('C:/Windows/System32/drivers/etc/hosts')
        .then(function(data) {
            showHostData(data);
        });
    }

    showHosts(basePath);
    findSelectedHost();
}());
