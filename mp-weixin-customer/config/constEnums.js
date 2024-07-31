"use strict";
function getLabelByValue(arr, value) {
  const item = arr.find((item2) => item2.value === value);
  return item ? item.label : "";
}
var OrderStatus = /* @__PURE__ */ ((OrderStatus2) => {
  OrderStatus2[OrderStatus2["WAITING_ACCEPT"] = 1] = "WAITING_ACCEPT";
  OrderStatus2[OrderStatus2["ACCEPTED"] = 2] = "ACCEPTED";
  OrderStatus2[OrderStatus2["DRIVER_ARRIVED"] = 3] = "DRIVER_ARRIVED";
  OrderStatus2[OrderStatus2["UPDATE_CART_INFO"] = 4] = "UPDATE_CART_INFO";
  OrderStatus2[OrderStatus2["START_SERVICE"] = 5] = "START_SERVICE";
  OrderStatus2[OrderStatus2["END_SERVICE"] = 6] = "END_SERVICE";
  OrderStatus2[OrderStatus2["UNPAID"] = 7] = "UNPAID";
  OrderStatus2[OrderStatus2["PAID"] = 8] = "PAID";
  OrderStatus2[OrderStatus2["CANCEL_ORDER"] = -1] = "CANCEL_ORDER";
  return OrderStatus2;
})(OrderStatus || {});
const OrderStatusMap = [
  {
    label: "等待接单",
    value: 1
    /* WAITING_ACCEPT */
  },
  {
    label: "已接单",
    value: 2
    /* ACCEPTED */
  },
  {
    label: "司机已到达",
    value: 3
    /* DRIVER_ARRIVED */
  },
  {
    label: "更新代驾车辆信息",
    value: 4
    /* UPDATE_CART_INFO */
  },
  {
    label: "开始服务",
    value: 5
    /* START_SERVICE */
  },
  // 结束代驾服务更新订单账单
  {
    label: "结束服务",
    value: 6
    /* END_SERVICE */
  },
  // 司机发送账单信息
  {
    label: "待付款",
    value: 7
    /* UNPAID */
  },
  // 乘客付款成功-》订单结束
  {
    label: "已付款",
    value: 8
    /* PAID */
  },
  {
    label: "系统取消订单",
    value: -1
    /* CANCEL_ORDER */
  }
];
exports.OrderStatus = OrderStatus;
exports.OrderStatusMap = OrderStatusMap;
exports.getLabelByValue = getLabelByValue;
