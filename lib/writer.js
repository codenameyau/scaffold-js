'use strict';

var async = require('async');
var fs = require('fs');
var path = require('path');

var FILES_DIR = path.join(__dirname, '../files');

exports.createHiddenFiles = function(files, callback) {
  var filesCreated = [];

  // Asynchronously copy each file using a stream.
  async.each(files, function(filename, done) {
    var hiddenFile = '.' + filename;
    fs.createReadStream(FILES_DIR + filename)
      .pipe(fs.createWriteStream(hiddenFile));
    filesCreated.push(hiddenFile);
    done();
  }, function(error) {
    if (error) {
      return callback(error);
    } callback(null, filesCreated);
  });
};
