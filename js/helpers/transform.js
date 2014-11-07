'use strict';

/**
 * Pad a number with leading zeros
 */
function pad (num, size) {
  if (num.toString().length >= size) return num;
  return (Math.pow(10, size) + Math.floor(num)).toString().substring(1);
}

// export
module.exports.pad = pad;
