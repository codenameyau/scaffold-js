'use strict';

var async = require('async');
var fs = require('fs');
var FILES_DIR = '../files/';

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
