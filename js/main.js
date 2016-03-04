(function() {

    var selectedHost,
        currentHostName = 'x',
        elements = {};
    const basePath = 'C:/Windows/System32/drivers/etc',
          hostFolder = 'host';
    /**
     * 显示当前目录下的hosts文件
     * @param  {Array} hostsNames 文件名数组
     * @return {[type]}            [description]
     */
    function showHosts(path) {
        ybq.listFiles(path)
        .then(function(files) {
            files.forEach(function(item, index) {
                var jqItem = $(`<li class="item" data-filename='${item}'>${item.replace(/\.txt/i, '')}</li>`);
                jqItem.on('click', function() {
                    onHostsClick(jqItem);
                });
                elements.hostItemContainer.append(jqItem);
            });
        });
    }
    /**
     * 用户点击host图标时, 切换到该host
     * @param  {jq} jqItem   图标节点的jq对象
     */
    function onHostsClick(jqItem) {
        var hostName = jqItem.data('filename');
        ybq.setHosts(`${hostFolder}/${hostName}`, function(configData) {
            ybq.showTip(`已将host切换到${hostName}`);
            selectedHost && selectedHost.removeClass('selected');
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
        ybq.readFile('C:/Windows/System32/drivers/etc/hosts')
        .then(function(data) {
            showHostData(data);
        });

        ybq.readline('C:/Windows/System32/drivers/etc/hosts', 0, function(line) {
            line = line.replace(/\s+/g, '');
            if (line.length < 2 || line[0] != '#') {
                return;
            }
            currentHostName = line.substr(1);
            $('.m-hosts li').each(function(index, item) {
                item = $(item);
                if (currentHostName == item.text()) {
                    item.addClass('selected');
                    selectedHost = item;
                }
            });
        });
    }

    function initElements() {
        elements.hostEdit = $('.m-hostedit');
        elements.hostNameInput = $('.m-hostedit input');
        elements.hostContentInput = $('.m-hostedit textarea');
        elements.hostItemContainer = $('.m-hosts ul');
    }
    /**
     * 初始化添加host 按钮的回调
     * @return {[type]} [description]
     */
    function initListeners() {
        $('#add-host').click(function() {
            $('.m-hostedit').show();
        });

        $('.m-hostedit .j-confirm').click(function() {
            if (!validateHostData()) {
                return;
            }
            makeHostFile({
                name: elements.hostNameInput.val(),
                content: elements.hostContentInput.val()
            });
        });

        $('.m-hostedit .j-reset').click(cleanInput);

        $('.m-hostedit .j-cancel').click(function() {
            cancelEditHost();
        });
    }

    function cancelEditHost() {
        cleanInput();
        elements.hostEdit.hide();
    }

    function cleanInput() {
        elements.hostNameInput.val('');
        elements.hostContentInput.val('');
    }

    function validateHostData() {
        var hostName = elements.hostNameInput.val(),
            hostContent = elements.hostContentInput.val();

        if (!hostName.length) {
            ybq.showTip('请填写host名称', true);
            return false;
        }

        return true;
    }

    function makeHostFile(args) {
        args.path = `${hostFolder}/${args.name}.txt`;
        args.content = `#${args.name}\r\n${args.content}`;

        ybq.makeFile(args)
        .then(function() {
            console.info('写入成功');
            ybq.showTip(`host文件${args.name}创建成功`);
            var jqItem = $(`<li class="item">${args.name}</li>`);
            jqItem.on('click', function() {
                onHostsClick(jqItem);
            });
            elements.hostItemContainer.append(jqItem);
            cancelEditHost();
        })
        .catch(function(err) {
            console.info('写入失败');
            if (err.code == 'EEXIST') {
                ybq.showTip(`host${args.name}已存在`, true);
            } else {
                ybq.showTip(`host写入失败`, true);
            }
        });
    }

    showHosts(hostFolder);
    findSelectedHost();
    initElements();
    initListeners();
}());
