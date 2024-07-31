"use strict";
const http_index = require("../../http/index.js");
function getLogin(code) {
  return http_index.http.get(`/driver/login/${code}`);
}
function getUserInfo() {
  return http_index.http.get("/driver/getDriverLoginInfo");
}
function updateUserInfo(userInfo) {
  return http_index.http.post("/driver/updateDriverAuthInfo", userInfo);
}
function getDriverAuthInfo() {
  return http_index.http.get("/driver/getDriverAuthInfo");
}
function updateUserPhoneByWx(params) {
  return http_index.http.post("/driver/updateDriverPhone", params);
}
function creatDriverFaceModel(params) {
  return http_index.http.post("/driver/creatDriverFaceModel", params);
}
function verifyDriverFace(params) {
  return http_index.http.post("/driver/verifyDriverFace", params);
}
function getDriverIsFaceRecognition() {
  return http_index.http.get("/driver/isFaceRecognition");
}
function getDriverLoginInfo() {
  return http_index.http.get("/driver/getDriverLoginInfo");
}
exports.creatDriverFaceModel = creatDriverFaceModel;
exports.getDriverAuthInfo = getDriverAuthInfo;
exports.getDriverIsFaceRecognition = getDriverIsFaceRecognition;
exports.getDriverLoginInfo = getDriverLoginInfo;
exports.getLogin = getLogin;
exports.getUserInfo = getUserInfo;
exports.updateUserInfo = updateUserInfo;
exports.updateUserPhoneByWx = updateUserPhoneByWx;
exports.verifyDriverFace = verifyDriverFace;
