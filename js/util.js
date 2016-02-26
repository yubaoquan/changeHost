(function () {
    const fs = require('fs');
    const readline = require('readline');

    function fileExsist(name) {
        return new Promise(function(resolve, reject) {
          fs.stat(name, function (err, stats) {
              if (err) {
                  reject(name);
              } else {
                  if (stats.isFile()) {
                      resolve(name);
                  } else {
                      ybq.showTip(`${name} 存在, 但不是文件`);
                  }
              }
          });
        });
    }

    function listFiles(path) {
        return new Promise(function(resolve, reject) {
            fs.readdir(path, function(err, files) {
                if (err) {
                    ybq.showTip(`读取目录[${path}]失败`);
                    reject();
                } else {
                    resolve(files);
                }
            });
        });
    }

    function ybq_readline(path, rowIndex, callback) {
        var i = 0;
        const rl = readline.createInterface({
            input: fs.createReadStream(path)
        });

        rl.on('line', function (line) {
            if (i == rowIndex) {
                callback(line);
                rl.close();
            }
            i ++;
        });
    }

    function readFile(path) {
        return new Promise(function (resolve, reject) {
            fs.readFile(path, 'utf-8', function (err, data) {
                if (err) {
                    console.error('read error');
                    reject();
                    throw err;
                } else {
                    resolve(data);
                }
            });
        });
    }

    ybq.fileExsist = fileExsist;
    ybq.listFiles = listFiles;
    ybq.readline = ybq_readline;
    ybq.readFile = readFile;
}());
