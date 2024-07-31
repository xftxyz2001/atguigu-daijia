"use strict";
const isSameOrAfter = function(o, c) {
  c.prototype.isSameOrAfter = function(that, units) {
    return this.isSame(that, units) || this.isAfter(that, units);
  };
};
exports.isSameOrAfter = isSameOrAfter;
