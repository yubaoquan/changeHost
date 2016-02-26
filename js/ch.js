(function (){
    const fs = require('fs'),
          prefix = 'C:/Windows/System32/drivers/etc/hosts_',
          hostFileName = 'C:/Windows/System32/drivers/etc/hosts';

    function setHosts(env, callback) {
        fs.readFile(prefix + env, 'utf-8', function (err, data) {
            if (err) {
                console.error('read error');
                throw err;
            } else {
                fs.writeFile(hostFileName, data, function (err) {
                  if (err) {
                      console.error('write error')
                      throw err;
                  } else {
                    //   ybq.showTip(`已将当前hosts设置为 ${env} .`);
                      console.info(data);
                      callback(data);
                  }
                });
            }

        });
    }

    function setHostsText(name) {
        console.info(name)
    }
    ybq.setHosts = setHosts;
}());
