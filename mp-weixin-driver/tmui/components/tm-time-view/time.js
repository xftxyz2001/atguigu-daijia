"use strict";
const tmui_components_tmTimeView_interface = require("./interface.js");
const tmui_tool_dayjs_esm_index = require("../../tool/dayjs/esm/index.js");
const tmui_tool_dayjs_esm_plugin_isSameOrBefore_index = require("../../tool/dayjs/esm/plugin/isSameOrBefore/index.js");
const tmui_tool_dayjs_esm_plugin_isSameOrAfter_index = require("../../tool/dayjs/esm/plugin/isSameOrAfter/index.js");
const tmui_tool_dayjs_esm_plugin_isBetween_index = require("../../tool/dayjs/esm/plugin/isBetween/index.js");
const DayJs = tmui_tool_dayjs_esm_index.dayjs;
DayJs.extend(tmui_tool_dayjs_esm_plugin_isBetween_index.isBetween);
DayJs.extend(tmui_tool_dayjs_esm_plugin_isSameOrBefore_index.isSameOrBefore);
DayJs.extend(tmui_tool_dayjs_esm_plugin_isSameOrAfter_index.isSameOrAfter);
function rangeNumber(from = 0, to = 0) {
  let range = [];
  from = from >= 0 ? from : 1;
  for (let i = from; i <= to; i++) {
    range.push(i);
  }
  return range;
}
function rangeTimeArray(dateStr, start, end, detail) {
  let startDayjs = DayJs(start);
  let endDayjs = DayJs(end);
  let dateDayjs = DayJs(dateStr);
  let dateArray = {
    year: [],
    month: [],
    date: [],
    hour: [],
    minute: [],
    second: []
  };
  function getar(timeType) {
    let temp = [];
    if (timeType == "year") {
      temp = rangeNumber(startDayjs.get("year"), endDayjs.get("year"));
    } else if (timeType == "month") {
      setd(tmui_components_tmTimeView_interface.timeDetailType.month, tmui_components_tmTimeView_interface.timeDetailType.year);
    } else if (timeType == "date") {
      setd(tmui_components_tmTimeView_interface.timeDetailType.day, tmui_components_tmTimeView_interface.timeDetailType.month);
    } else if (timeType == "hour") {
      setd(tmui_components_tmTimeView_interface.timeDetailType.hour, tmui_components_tmTimeView_interface.timeDetailType.day);
    } else if (timeType == "minute") {
      setd(tmui_components_tmTimeView_interface.timeDetailType.minute, tmui_components_tmTimeView_interface.timeDetailType.hour);
    } else if (timeType == "second") {
      setd(tmui_components_tmTimeView_interface.timeDetailType.second, tmui_components_tmTimeView_interface.timeDetailType.minute);
    }
    function setd(type, timeType2) {
      let start2 = 0;
      let end2 = 0;
      let nowtm = dateDayjs;
      if (dateDayjs.isSameOrBefore(startDayjs, timeType2)) {
        nowtm = startDayjs;
        start2 = startDayjs.get(type);
        end2 = startDayjs.endOf(timeType2).get(type);
        if (nowtm.isSame(endDayjs, timeType2)) {
          end2 = endDayjs.get(type);
        }
      } else if (dateDayjs.isSameOrAfter(endDayjs, timeType2)) {
        nowtm = endDayjs;
        start2 = endDayjs.startOf(timeType2).get(type);
        end2 = endDayjs.get(type);
        if (nowtm.isSame(startDayjs, timeType2)) {
          start2 = startDayjs.get(type);
        }
      } else {
        start2 = dateDayjs.startOf(timeType2).get(type);
        end2 = dateDayjs.endOf(timeType2).get(type);
      }
      temp = rangeNumber(start2, end2);
    }
    dateArray[timeType] = temp;
  }
  let key = "";
  for (key in detail) {
    if (key == "day") {
      key = "date";
    }
    getar(key);
  }
  return dateArray;
}
function getIndexNowbydate(tmArray, nowtime, detail) {
  const d = DayJs(nowtime);
  const intermediate = [
    [tmui_components_tmTimeView_interface.timeDetailType.year, detail.year],
    [tmui_components_tmTimeView_interface.timeDetailType.month, detail.month],
    [tmui_components_tmTimeView_interface.timeDetailType.day, detail.day],
    [tmui_components_tmTimeView_interface.timeDetailType.hour, detail.hour],
    [tmui_components_tmTimeView_interface.timeDetailType.minute, detail.minute],
    [tmui_components_tmTimeView_interface.timeDetailType.second, detail.second]
  ];
  const idx = intermediate.filter((m) => m[1]).map((m) => {
    const type = m[0];
    const index = tmArray[type].findIndex((n) => n === d.get(type));
    return index === -1 ? 0 : index;
  });
  return [
    ...idx,
    ...[0, 0, 0, 0, 0, 0]
  ].slice(0, 6);
}
function getNowbyIndex(tmArray, nowIndex, detail) {
  const intermediate = [
    [tmui_components_tmTimeView_interface.timeDetailType.year, detail.year],
    [tmui_components_tmTimeView_interface.timeDetailType.month, detail.month],
    [tmui_components_tmTimeView_interface.timeDetailType.day, detail.day],
    [tmui_components_tmTimeView_interface.timeDetailType.hour, detail.hour],
    [tmui_components_tmTimeView_interface.timeDetailType.minute, detail.minute],
    [tmui_components_tmTimeView_interface.timeDetailType.second, detail.second]
  ];
  function getValue(type) {
    const index = intermediate.filter((m) => m[1]).findIndex((m) => m[0] === type);
    if (index !== -1) {
      return tmArray[type][nowIndex[index]];
    }
    return tmArray[type][tmArray[type].length - 1];
  }
  let year = getValue(tmui_components_tmTimeView_interface.timeDetailType.year);
  let month = getValue(tmui_components_tmTimeView_interface.timeDetailType.month);
  let date = getValue(tmui_components_tmTimeView_interface.timeDetailType.day);
  let hour = getValue(tmui_components_tmTimeView_interface.timeDetailType.hour);
  let minute = getValue(tmui_components_tmTimeView_interface.timeDetailType.minute);
  let second = getValue(tmui_components_tmTimeView_interface.timeDetailType.second);
  let str = year + "/" + (month + 1) + "/" + date + " " + hour + ":" + minute + ":" + second;
  return DayJs(str).format("YYYY/MM/DD HH:mm:ss");
}
function checkNowDateisBetween(nowdate, start, end) {
  nowdate = DayJs(nowdate).isValid() ? DayJs(nowdate) : DayJs();
  start = DayJs(start);
  end = DayJs(end);
  if (nowdate.isSameOrBefore(start)) {
    return start.format("YYYY/MM/DD HH:mm:ss");
  }
  if (nowdate.isSameOrAfter(end)) {
    return end.format("YYYY/MM/DD HH:mm:ss");
  }
  return nowdate.format("YYYY/MM/DD HH:mm:ss");
}
exports.checkNowDateisBetween = checkNowDateisBetween;
exports.getIndexNowbydate = getIndexNowbydate;
exports.getNowbyIndex = getNowbyIndex;
exports.rangeTimeArray = rangeTimeArray;
