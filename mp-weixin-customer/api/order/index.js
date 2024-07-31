"use strict";
const http_index = require("../../http/index.js");
function getExpectOrder(params) {
  return http_index.http.post("/order/expectOrder", params);
}
function submitOrder(params) {
  return http_index.http.post("/order/submitOrder", params);
}
function getOrderStatus(orderId) {
  return http_index.http.get(`/order/getOrderStatus/${orderId}`);
}
function getCarLocation(orderId) {
  return http_index.http.get(`/order/getCacheOrderLocation/${orderId}`);
}
function getOrderServiceLastLocation(orderId) {
  return http_index.http.get(`/order/getOrderServiceLastLocation/${orderId}`);
}
function getDriverInfo(orderId) {
  return http_index.http.get(`/order/getDriverInfo/${orderId}`);
}
function customerCancelNoAcceptOrder(orderId) {
  return http_index.http.get(`/order/customerCancelNoAcceptOrder/${orderId}`);
}
function getOrderListPage(params) {
  return http_index.http.get(`/order/findCustomerOrderPage/${params.page}/${params.limit}`);
}
function getOrderDetail(orderId) {
  return http_index.http.get(`/order/getOrderInfo/${orderId}`);
}
function findCustomerCurrentOrder() {
  return http_index.http.get("/order/searchCustomerCurrentOrder");
}
function findCustomerCouponUsedPage(params) {
  return http_index.http.get(`/coupon/findUsedPage/${params.page}/${params.limit}`);
}
function findCustomerCouponExpiredPage(params) {
  return http_index.http.get(`/coupon/findNoUsePage/${params.page}/${params.limit}`);
}
function findCustomerCouponNotReceivePage(params) {
  return http_index.http.get(`/coupon/findNoReceivePage/${params.page}/${params.limit}`);
}
function getBestCoupon(orderId) {
  return http_index.http.get(`/coupon/findAvailableCoupon/${orderId}`);
}
function receiveCoupon(couponId) {
  return http_index.http.get(`/coupon/receive/${couponId}`);
}
function getCalculateDrivingLine(params) {
  return http_index.http.post("/order/calculateDrivingLine", params);
}
exports.customerCancelNoAcceptOrder = customerCancelNoAcceptOrder;
exports.findCustomerCouponExpiredPage = findCustomerCouponExpiredPage;
exports.findCustomerCouponNotReceivePage = findCustomerCouponNotReceivePage;
exports.findCustomerCouponUsedPage = findCustomerCouponUsedPage;
exports.findCustomerCurrentOrder = findCustomerCurrentOrder;
exports.getBestCoupon = getBestCoupon;
exports.getCalculateDrivingLine = getCalculateDrivingLine;
exports.getCarLocation = getCarLocation;
exports.getDriverInfo = getDriverInfo;
exports.getExpectOrder = getExpectOrder;
exports.getOrderDetail = getOrderDetail;
exports.getOrderListPage = getOrderListPage;
exports.getOrderServiceLastLocation = getOrderServiceLastLocation;
exports.getOrderStatus = getOrderStatus;
exports.receiveCoupon = receiveCoupon;
exports.submitOrder = submitOrder;
