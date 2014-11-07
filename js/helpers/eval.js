'use strict';

var _ = require('underscore');

/**
 * Function to return mostly true
 */
function mostlyTrue () {
  return Math.random() >= 0.05;
}

/**
 * Function to return mostly false
 */
function mostlyFalse () {
  return Math.random() <= 0.05;
}

/**
 * Function to compare 2 arrays
 */
function identical (arr1, arr2) {
  var bool = true;
  _.map(arr1, function (item) {
    if (!_.contains(arr2, item)) bool = false;
  });
  return bool;
}

// export
module.exports = {
  mostlyTrue: mostlyTrue,
  mostlyFalse: mostlyFalse,
  identical: identical
};
