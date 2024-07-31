"use strict";
const ResultEnum = {
  SUCCESS: 200,
  EXPIRE: [305, 601, 602],
  ERROR: -1,
  ERRMESSAGE: "请求失败",
  TIMEOUT: 25e3,
  TYPE: "success"
};
exports.ResultEnum = ResultEnum;
