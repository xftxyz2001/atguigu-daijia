"use strict";
const tmui_tool_dayjs_esm_constant = require("./constant.js");
var padStart = function padStart2(string, length, pad) {
  var s = String(string);
  if (!s || s.length >= length)
    return string;
  return "" + Array(length + 1 - s.length).join(pad) + string;
};
var padZoneStr = function padZoneStr2(instance) {
  var negMinutes = -instance.utcOffset();
  var minutes = Math.abs(negMinutes);
  var hourOffset = Math.floor(minutes / 60);
  var minuteOffset = minutes % 60;
  return (negMinutes <= 0 ? "+" : "-") + padStart(hourOffset, 2, "0") + ":" + padStart(minuteOffset, 2, "0");
};
var monthDiff = function monthDiff2(a, b) {
  if (a.date() < b.date())
    return -monthDiff2(b, a);
  var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month());
  var anchor = a.clone().add(wholeMonthDiff, tmui_tool_dayjs_esm_constant.M);
  var c = b - anchor < 0;
  var anchor2 = a.clone().add(wholeMonthDiff + (c ? -1 : 1), tmui_tool_dayjs_esm_constant.M);
  return +(-(wholeMonthDiff + (b - anchor) / (c ? anchor - anchor2 : anchor2 - anchor)) || 0);
};
var absFloor = function absFloor2(n) {
  return n < 0 ? Math.ceil(n) || 0 : Math.floor(n);
};
var prettyUnit = function prettyUnit2(u) {
  var special = {
    M: tmui_tool_dayjs_esm_constant.M,
    y: tmui_tool_dayjs_esm_constant.Y,
    w: tmui_tool_dayjs_esm_constant.W,
    d: tmui_tool_dayjs_esm_constant.D,
    D: tmui_tool_dayjs_esm_constant.DATE,
    h: tmui_tool_dayjs_esm_constant.H,
    m: tmui_tool_dayjs_esm_constant.MIN,
    s: tmui_tool_dayjs_esm_constant.S,
    ms: tmui_tool_dayjs_esm_constant.MS,
    Q: tmui_tool_dayjs_esm_constant.Q
  };
  return special[u] || String(u || "").toLowerCase().replace(/s$/, "");
};
var isUndefined = function isUndefined2(s) {
  return s === void 0;
};
const U = {
  s: padStart,
  z: padZoneStr,
  m: monthDiff,
  a: absFloor,
  p: prettyUnit,
  u: isUndefined
};
exports.U = U;
