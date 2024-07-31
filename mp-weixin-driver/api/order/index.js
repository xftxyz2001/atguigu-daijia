"use strict";
const http_index = require("../../http/index.js");
function startOrderService() {
  return http_index.http.get("/driver/startService");
}
function stopOrderService() {
  return http_index.http.get("/driver/stopService");
}
function updateDriverLocation(params) {
  return http_index.http.post("/location/updateDriverLocation", params);
}
function grabOrder(orderId) {
  return http_index.http.get(`/order/robNewOrder/${orderId}`);
}
function getNewOrder() {
  return http_index.http.get("/order/findNewOrderQueueData");
}
function getExpectOrder(params) {
  return http_index.http.post("/order/calculateDrivingLine", params);
}
function getOrderDetail(orderId) {
  return http_index.http.get(`/order/getOrderInfo/${orderId}`);
}
function updateLocationCacheToStart(params) {
  return http_index.http.post("/location/updateOrderLocationToCache", params);
}
function updateLocationCacheToEnd(params) {
  return http_index.http.post("/location/saveOrderServiceLocation", [params]);
}
function getOrderStatus(orderId) {
  return http_index.http.get(`/order/getOrderStatus/${orderId}`);
}
function updateOrderStatusToDriverArrived(orderId) {
  return http_index.http.get(`/order/driverArriveStartLocation/${orderId}`);
}
function updateCarInfo(params) {
  return http_index.http.post("/order/updateOrderCart", params);
}
function startOrderServiceByDriver(orderId) {
  return http_index.http.post("/order/startDrive", { orderId });
}
function endOrderServiceByDriver(params) {
  return http_index.http.post("/order/endDrive", params);
}
function sendOrderBillInfo(orderId) {
  return http_index.http.get(`/order/sendOrderBillInfo/${orderId}`);
}
function getOrderListPage(params) {
  return http_index.http.get(`/order/findDriverOrderPage/${params.page}/${params.limit}`);
}
function stopService() {
  return http_index.http.get("/driver/stopService");
}
function searchDriverCurrentOrder() {
  return http_index.http.get("/order/searchDriverCurrentOrder");
}
exports.endOrderServiceByDriver = endOrderServiceByDriver;
exports.getExpectOrder = getExpectOrder;
exports.getNewOrder = getNewOrder;
exports.getOrderDetail = getOrderDetail;
exports.getOrderListPage = getOrderListPage;
exports.getOrderStatus = getOrderStatus;
exports.grabOrder = grabOrder;
exports.searchDriverCurrentOrder = searchDriverCurrentOrder;
exports.sendOrderBillInfo = sendOrderBillInfo;
exports.startOrderService = startOrderService;
exports.startOrderServiceByDriver = startOrderServiceByDriver;
exports.stopOrderService = stopOrderService;
exports.stopService = stopService;
exports.updateCarInfo = updateCarInfo;
exports.updateDriverLocation = updateDriverLocation;
exports.updateLocationCacheToEnd = updateLocationCacheToEnd;
exports.updateLocationCacheToStart = updateLocationCacheToStart;
exports.updateOrderStatusToDriverArrived = updateOrderStatusToDriverArrived;
