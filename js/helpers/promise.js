'use strict';

var Q = require('q');
var Lazy = require('lazy.js');

var slice = global.Array.prototype.slice;

/**
 * Closure for conditional Promises
 */
function truthy (cond, thenSth, elseSth) {
  return function (data) {
    if (cond(data)) return thenSth(data);
    return elseSth(data);
  };
}

/**
 * Promise object for a timer
 */
function sleep (millisec) {
  var dfr = Q.defer(), timeoutId;
  timeoutId = global.setTimeout(function () {
    global.clearTimeout(timeoutId);
    return dfr.resolve(millisec);
  }, millisec);
  return dfr.promise;
}

/**
 * Promise object to make a function delay
 */
function delay (func, millisec) {
  var dfr = Q.defer(), timeoutId, args = slice.call(arguments, 2);
  timeoutId = global.setTimeout(function () {
    global.clearTimeout(timeoutId);
    return dfr.resolve(func.apply(null, args));
  }, millisec);
  return dfr.promise;
}

/**
 * Promise object to make a function deferred
 */
function defer (func) {
  return delay.apply(null, [func, 1].concat(slice.call(arguments, 1)));
}

/**
 * Promise object for multiple same type of Promise objects
 */
function promises (items, func) {
  var dfr = Q.defer(), promises_ = [];
  Lazy(items).each(function (item) { promises_.push(func(item)); });
  Q.all(promises_).then(dfr.resolve, dfr.reject);
  return dfr.promise;
}

// export
module.exports = {
  truthy: truthy,
  sleep: sleep,
  delay: delay,
  defer: defer,
  promises: promises
};
