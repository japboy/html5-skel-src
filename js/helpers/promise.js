'use strict';

var Q = require('q');
var Lazy = require('lazy.js');

/**
 * Promise object for a timer
 */
function sleep (millisec) {
  var dfr = Q.defer(), timeoutId;
  timeoutId = global.setTimeout(function () {
    global.clearTimeout(timeoutId);
    dfr.resolve(millisec);
  }, millisec);
  return dfr.promise;
}

/**
 * Promise object for multiple same type of Promise objects
 */
function preloads (uris, type) {
  var dfr = Q.defer(), promises = [];
  Lazy(uris).map(function (uri) { promises.push(type(uri)); }).toArray();
  Q.all(promises).then(dfr.resolve, dfr.reject);
  return dfr.promise;
}

// export
module.exports = {
  sleep: sleep,
  preloads: preloads
};
