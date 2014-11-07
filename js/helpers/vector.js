'use strict';

/**
 * Transform degrees to radians
 */
function d2r (deg) { return deg * Math.PI / 180; }

/**
 * Transform radians to degrees
 */
function r2d (rad) { return rad * 180 / Math.PI; }

/**
 * Transform a point by linear interpolation between 2 points
 */
function lerp (point1, point2, rate) {
  point1 += (point2 - point1) * rate;
  return point1;
}

// export
module.exports = {
  d2r: d2r,
  r2d: r2d,
  lerp: lerp
};
