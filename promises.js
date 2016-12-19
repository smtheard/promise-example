// most of this example derived from https://www.promisejs.org/
'use strict'
var fs = require('fs');
var Promise = require('promise');

// read file without promise:
var readFile = function (filename) {
  fs.readFile(filename, 'utf8', function(err, res){
    console.log("readFile called, response: " + res);
  });
}

readFile('text_file_1.txt');

// read file without promise with some
// logic to handle errors, etc
var readFile = function(filename, callback) {
  fs.readFile(filename, 'utf8', function(err, res){
    callback(err, res);
  });
}

readFile('text_file_1.txt', function(err, res) {console.log('within callback with resp: ' + res)});


var promiseReadFile = Promise.denodeify(require('fs').readFile);

var p_readFile = function(filename, callback) {
  return promiseReadFile(filename, 'utf8')
    .then(function(res) {console.log('in then with resp: ' + res)})
    .nodeify(callback);
}

p_readFile('text_file_1.txt', 
  p_readFile('text_file_2.txt', function(){console.log("nested callback after reading text file 2")})
).done(function() {console.log("promise done")});