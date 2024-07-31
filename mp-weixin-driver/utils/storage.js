"use strict";
const common_vendor = require("../common/vendor.js");
const config_constant = require("../config/constant.js");
function setToken(token) {
  common_vendor.index.setStorageSync(config_constant.TOKEN_KEY, token);
}
function getToken() {
  return common_vendor.index.getStorageSync(config_constant.TOKEN_KEY);
}
function removeToken() {
  common_vendor.index.removeStorageSync(config_constant.TOKEN_KEY);
}
function setUser(user) {
  common_vendor.index.setStorageSync(config_constant.USER_KEY, user);
}
function removeUser() {
  common_vendor.index.removeStorageSync(config_constant.USER_KEY);
}
exports.getToken = getToken;
exports.removeToken = removeToken;
exports.removeUser = removeUser;
exports.setToken = setToken;
exports.setUser = setUser;
