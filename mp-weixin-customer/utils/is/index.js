"use strict";
function isNumber(value) {
  return Object.prototype.toString.call(value) === "[object Number]";
}
exports.isNumber = isNumber;
