"use strict";
const http_index = require("../../http/index.js");
function wechatPay(params) {
  return http_index.http.post("/order/createWxPayment", params);
}
function queryOrderPayStatus(orderNo) {
  return http_index.http.get(`/order/queryPayStatus/${orderNo}`);
}
exports.queryOrderPayStatus = queryOrderPayStatus;
exports.wechatPay = wechatPay;
