'use strict';

var fs = require('fs'),
    mkdirp = require('mkdirp'),
    tmpFilesCache = [];

process.on('exit', function() {
  while(tmpFilesCache.length) {
    var tmpFile = tmpFilesCache.shift();
    try {
      // console.log('unlink: ', tmpFile);
      fs.unlinkSync(tmpFile);
    } catch(err) {
    }
  }
});

module.exports = {
  existsSync: function(path) {
    var fs = require('fs');

    try {
      fs.statSync(path);
    } catch (err) {
      return false;
    }

    return true;
  },

  createDirSync: function(path) {
    if(!this.existsSync(path)) {
      mkdirp.sync(path);
    }
  },

  createTempFileSync: function(content) {
    var tmpFilePath = this.tempFilePath(),
        fd = fs.openSync(tmpFilePath, 'wx');

    fs.writeSync(fd, content);

    return tmpFilePath;
  },

  tempFilePath: function() {
    var filePath = this.tempPath() + this.tempFileName();
    tmpFilesCache.push(filePath);

    return filePath;
  },

  tempFileName: function() {
    var id = null;
    var tempPath = this.tempPath();
    do {
      id = Date.now() + Math.random();
    } while(this.existsSync(tempPath + '/' + id));

    return id + '';
  },

  tempPath: function() {
    var temp = process.env.TMPDIR
        || process.env.TMP
        || process.env.TEMP
    
    return temp.replace(/([^\/])$/, '$1/');

  }
}