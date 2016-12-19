// most of this example derived from https://www.promisejs.org/

fs = require('fs');


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



var promiseReadFile = function(filename){
  return new Promise(function (fulfill, reject){
    readFile(filename, 'utf8').done(function (res){
      try {
        fulfill(res);
      } catch (ex) {
        reject(ex);
      }
    }, reject);
  });
}

