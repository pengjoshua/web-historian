var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, (err, sites) => {
    if (err) {
      console.log('Error');
    } else {
      sites = sites.toString().split('\n');
      callback(sites);
    }
  });
};

exports.isUrlInList = function(url, callback) { 
  exports.readListOfUrls((sites) => {
    // loop through and check for match
    callback(sites.indexOf(url) !== -1);
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url + '\n', (err) => {
    if (err) {
      console.log('Error');
    } else {
      if (callback) {
        callback();
      }
    }
  });
};

exports.readArchive = function(callback) {
  fs.readdir(exports.paths.archivedSites, (err, files) => {
    if (err) {
      console.log('Error');
    } else {
      var filesInArchive = [];
      files.forEach((file) => {
        filesInArchive.push(file);
      });
      callback(filesInArchive);
    }
  });
};

exports.isUrlArchived = function(fileName, callback) {
  exports.readArchive((filesInArchive) => {
    // loop through files and check for match
    callback(filesInArchive.indexOf(fileName) !== -1);
  });
};

exports.downloadUrls = function(urlArray) {
  
};
