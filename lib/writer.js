'use strict';

var async = require('async');
var fs = require('fs');
var FILES_DIR = '../files/';

exports.createFiles = function(files, callback) {

  // Asynchronously copy each file using a stream.
  async.each(files, function(filename, done) {
    fs.createReadStream(FILES_DIR + filename)
      .pipe(fs.createWriteStream(filename));
    done();
  }, function(error) {
    if (error) {
      return callback(error);
    } callback(null, files);
  });
};
