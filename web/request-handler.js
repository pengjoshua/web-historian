var path = require('path');
var archive = require('../helpers/archive-helpers');
var utils = require('./http-helpers.js');
var fs = require('fs');
var parser = require('url');
// require more modules/folders here!

// var routes = {
//   '/': __dirname + '/public/index.html',
//   '/www.google.com': archive.paths.archivedSites + '/' + 'www.google.com'
// };

var actions = {
  'GET': function(request, response, route) {
    utils.serveAssets(response, route, utils.sendResponse); 

  },
  'POST': function(request, response, route) {
    // utils.collectData(request, function(message) {
    //   message.objectId = ++objectIdCounter;
    //   messages.push(message);
    //   utils.sendResponse(response, {objectId: message.objectId}, 201);
    // });
  },
  'OPTIONS': function(request, response, route) {
    // utils.sendResponse(response, null);
  }
};

exports.handleRequest = function (req, res) {
  console.log('Serving request type' + req.method + ' for url ' + req.url);
  var action = actions[req.method];
  var urlParts = parser.parse(req.url);

  if (urlParts.pathname === '/') {
    route = __dirname + '/public/index.html';

    // TESTER
    console.log('IS URL IN LIST............', archive.isUrlInList('example1.com', (boolean) => {
        return boolean;
      }
    ));
    // utils.sendResponse(res, archive.readListOfUrls, 200);  <>?<
  } else {
    if (archive.isUrlInList()) {
      route = urlParts.pathname;
    } else {
      utils.sendResponse(res, 'Not found', 404);
    }
  }

  if (action) {
    action(req, res, route);
  } else {
    utils.sendResponse(res, 'Not found', 404);
  }
  // res.end(archive.paths.list);
};

