"use strict";
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const common_vendor = require("../../common/vendor.js");
const class_timerClass = require("../../class/timerClass2.js");
const api_order_index = require("../../api/order/index.js");
const useReceiveOrder = common_vendor.defineStore({
  id: "app-receive-order",
  state: () => ({
    // 存放查询新订单的定时器
    timer: null,
    // 存放切换当前订单的定时器
    switchCurrentOrderTimer: null,
    // 出发地
    currentOrder: {
      // orderId: 1,
      // startLocation: '北京市天安门北京市天安门北京市天安门北京市天安门北京市天安门北京市天安门',
      // endLocation: '北京市天安门',
      // expectAmount: 50,
      // expectDistance: 50,
      // distance: 50,
      // expectTime: 50,
      // favourFee: 0,
      // createTime: ''
    },
    orderList: []
  }),
  actions: {
    // 开启接单服务
    startOrderService() {
      return __async(this, null, function* () {
        console.log("开启接单服务");
        yield api_order_index.startOrderService();
        common_vendor.index.getLocation({
          type: "gcj02",
          success: function(res) {
            console.log("开启接单服务----更新位置", res);
            api_order_index.updateDriverLocation({
              longitude: res.longitude,
              latitude: res.latitude
              // todo 地址位置写死：昌平区政府
              // longitude: 116.23128,
              // latitude: 40.22077
            });
          }
        });
      });
    },
    // 停止接单服务
    stopOrderService() {
      return __async(this, null, function* () {
        console.log("停止接单服务");
        yield api_order_index.stopOrderService();
      });
    },
    // 查询新订单
    getNewOrder() {
      return __async(this, null, function* () {
        console.log("查询新订单");
        const res = yield api_order_index.getNewOrder();
        this.orderList.push(...res.data);
      });
    },
    //   司机抢单
    grabOrder(orderId) {
      return __async(this, null, function* () {
        console.log("司机抢单");
        yield api_order_index.grabOrder(orderId || this.currentOrder.orderId);
      });
    },
    // 轮询获取新订单
    queryGetNewOrder() {
      return __async(this, null, function* () {
        if (this.timer)
          return;
        this.stopQueryGetNewOrder();
        this.timer = new class_timerClass.TimerClass({
          time: 5e3,
          callback: () => __async(this, null, function* () {
            yield this.getNewOrder();
          })
        });
        this.timer.start();
      });
    },
    // 停止轮询获取新订单
    stopQueryGetNewOrder() {
      var _a;
      (_a = this.timer) == null ? void 0 : _a.stop();
      this.timer = null;
    },
    //   切换当前订单
    switchCurrentOrder(callBack = () => {
    }) {
      if (!this.orderList.length)
        return;
      console.log("切换当前订单");
      this.currentOrder = this.orderList.shift() || this.currentOrder;
      callBack();
    },
    //   轮询切换当前订单
    querySwitchCurrentOrder(callBack = () => {
    }) {
      return __async(this, null, function* () {
        if (this.switchCurrentOrderTimer)
          return;
        this.stopQuerySwitchCurrentOrder();
        this.switchCurrentOrderTimer = new class_timerClass.TimerClass({
          time: 6e3,
          callback: () => __async(this, null, function* () {
            this.switchCurrentOrder(callBack);
          })
        });
        this.switchCurrentOrderTimer.start();
      });
    },
    // 停止轮询切换当前订单
    stopQuerySwitchCurrentOrder() {
      var _a;
      (_a = this.switchCurrentOrderTimer) == null ? void 0 : _a.stop();
      this.switchCurrentOrderTimer = null;
    }
  }
});
exports.useReceiveOrder = useReceiveOrder;
