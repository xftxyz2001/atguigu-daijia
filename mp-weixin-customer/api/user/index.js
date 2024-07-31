"use strict";
const http_index = require("../../http/index.js");
function getLogin(code) {
  return http_index.http.get(`/customer/login/${code}`);
}
function getUserInfo() {
  return http_index.http.get("/customer/getCustomerLoginInfo");
}
function updateUserInfo(userInfo) {
  return http_index.http.post("/customer/updateCustomerInfo");
}
function updateUserPhoneByWx(params) {
  return http_index.http.post("/customer/updateWxPhone", params);
}
exports.getLogin = getLogin;
exports.getUserInfo = getUserInfo;
exports.updateUserInfo = updateUserInfo;
exports.updateUserPhoneByWx = updateUserPhoneByWx;
