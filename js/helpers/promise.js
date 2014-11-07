'use strict';

var Q = require('q');
var _ = require('underscore');

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
  _.map(uris, function (uri) { promises.push(type(uri)); });
  Q.all(promises).then(dfr.resolve, dfr.reject);
  return dfr.promise;
}

// export
module.exports = {
  sleep: sleep,
  preloads: preloads
};
