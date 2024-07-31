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
const common_assets = require("../../common/assets.js");
const class_TimerClass = require("../../class/TimerClass.js");
const config_constEnums = require("../../config/constEnums.js");
const api_order_index = require("../../api/order/index.js");
const class_RecorderManagerClass = require("../../class/RecorderManagerClass.js");
const utils_storage = require("../../utils/storage.js");
function formatPolyline(polyline) {
  const coors = polyline;
  const pl = [];
  const kr = 1e6;
  for (let i = 2; i < coors.length; i++) {
    coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
  }
  for (let i = 0; i < coors.length; i += 2) {
    pl.push({
      longitude: coors[i + 1],
      latitude: coors[i]
    });
  }
  return pl;
}
const useTakeCarInfoStore = common_vendor.defineStore({
  id: "app-take-car-info",
  state: () => ({
    // 存放查询司机位置的轮询定时器实例:出发位置-> 目的地
    timer: null,
    // 存放定时录音的定时器循环实例
    recordTimer: null,
    recorderManagerInstance: null,
    // 出发地
    from: {
      address: "",
      longitude: 0,
      latitude: 0
    },
    // 目的地
    to: {
      address: "",
      longitude: 0,
      latitude: 0
    },
    // 路线信息
    RouteInfo: {
      // 路线规划
      polyline: [],
      // 路线距离 方案整体距离（米）
      distance: 0,
      // 路线时间 方案估算时间（分钟）
      duration: 0,
      // 路线标记点
      markers: []
    },
    //   乘坐的车辆信息
    carInfo: {
      driverInfo: {
        wxOpenId: "",
        name: "",
        gender: "",
        avatarUrl: "",
        driverLicenseAge: 0,
        orderCount: 0,
        score: 0
      },
      // 存放查询司机位置的轮询定时器实例:司机位置->出发位置
      timer: null,
      // 出发地
      from: {
        address: "",
        longitude: 0,
        latitude: 0
      },
      // 目的地
      to: {
        address: "",
        longitude: 0,
        latitude: 0
      },
      // 路线信息
      RouteInfo: {
        // 路线规划
        polyline: [],
        // 路线距离 方案整体距离（米）
        distance: 0,
        // 路线时间 方案估算时间（分钟）
        duration: 0,
        // 路线标记点
        markers: []
      }
    },
    orderCount3: 0,
    //   订单相关信息
    orderInfo: {
      // 存放查询订单状态的轮询定时器实例
      timer: null,
      // 订单id
      orderId: 0,
      // 订单状态
      orderStatus: 0
    }
  }),
  actions: {
    // 设置订单id
    setOrderId(orderId) {
      this.orderInfo.orderId = orderId;
    },
    // 设置订单状态
    setOrderStatus(orderStatus) {
      this.orderInfo.orderStatus = orderStatus;
    },
    // 重置订单相关信息
    resetOrderInfo() {
      this.stopQueryOrderStatus();
      this.orderInfo = {
        timer: null,
        orderId: 0,
        orderStatus: 0
      };
    },
    // 设置出发地
    setFrom(from) {
      this.from = from;
    },
    // 设置目的地
    setTo(to) {
      this.to = to;
    },
    // 设置出发地和目的地
    setFromAndTo(position) {
      this.from = position.from;
      this.to = position.to;
    },
    // 重置出发地
    resetFrom() {
      this.from = {
        address: "",
        longitude: 0,
        latitude: 0
      };
    },
    // 重置目的地
    resetTo() {
      this.to = {
        address: "",
        longitude: 0,
        latitude: 0
      };
    },
    // 重置出发地和目的地
    resetFromAndTo() {
      this.resetFrom();
      this.resetTo();
    },
    // 设置路线信息
    setRouteInfo(RouteInfo) {
      this.RouteInfo = RouteInfo;
    },
    // 重置路线信息
    resetRouteInfo() {
      this.RouteInfo = {
        // 路线规划
        polyline: [],
        // 路线距离 方案整体距离（KM）
        distance: 0,
        // 路线时间 方案估算时间（分钟）
        duration: 0,
        // 路线标记点
        markers: []
      };
    },
    // 重置出发地和目的地以及路线信息
    resetFromAndToAndRouteInfo() {
      this.resetFromAndTo();
      this.resetRouteInfo();
    },
    // 路径规划 type 1:出发地->目的地 startImgUrl 2:司机位置->目的地 carImgUrl
    routePlan(type = 1) {
      return __async(this, null, function* () {
        const { from, to } = this;
        const params = {
          startPointLongitude: from.longitude,
          startPointLatitude: from.latitude,
          endPointLongitude: to.longitude,
          endPointLatitude: to.latitude
        };
        const res = yield api_order_index.getExpectOrder(params);
        const route = res.data;
        const duration = route.duration;
        const distance = route.distance;
        const polyline = [
          {
            points: formatPolyline(route.polyline),
            width: 6,
            color: "#05B473",
            arrowLine: true
          }
        ];
        const markers = [
          {
            id: 1,
            latitude: to.latitude,
            longitude: to.longitude,
            width: 25,
            height: 35,
            anchor: {
              x: 0.5,
              y: 0.5
            },
            iconPath: common_assets.endImgUrl
          },
          {
            id: 2,
            latitude: from.latitude,
            longitude: from.longitude,
            width: 25,
            height: 35,
            anchor: {
              x: 0.5,
              y: 0.5
            },
            iconPath: type === 1 ? common_assets.startImgUrl : common_assets.carImgUrl
          }
        ];
        this.setRouteInfo({
          polyline,
          distance,
          duration,
          markers
        });
        console.log("this.RouteInfo", this.RouteInfo);
      });
    },
    //   设置乘坐的车辆信息
    setCarInfo(carInfo) {
      this.carInfo = carInfo;
    },
    // 重置乘坐的车辆信息
    resetCarInfo() {
      this.carInfo = {
        timer: null,
        driverInfo: {
          wxOpenId: "",
          name: "",
          gender: "",
          avatarUrl: "",
          driverLicenseAge: 0,
          orderCount: 0,
          score: 0
        },
        // 出发地
        from: {
          address: "",
          longitude: 0,
          latitude: 0
        },
        // 目的地
        to: {
          address: "",
          longitude: 0,
          latitude: 0
        },
        // 路线信息
        RouteInfo: {
          // 路线规划
          polyline: [],
          // 路线距离 方案整体距离（米）
          distance: 0,
          // 路线时间 方案估算时间（分钟）
          duration: 0,
          // 路线标记点
          markers: []
        }
      };
    },
    //   设置乘坐的车辆信息
    setCarRouteInfo(RouteInfo) {
      this.carInfo.RouteInfo = RouteInfo;
    },
    // 设置司机信息
    setCarDriverInfo(driverInfo) {
      this.carInfo.driverInfo = driverInfo;
    },
    // 设置司机出发地
    setCarFrom(from) {
      this.carInfo.from = from;
    },
    // 设置司机目的地
    setCarTo(to) {
      this.carInfo.to = to;
    },
    // 上传位置，更新当前位置 type 0:根据订单状态自动判断type为1还是2 1:司机位置->出发地  2:司机位置->目的地 不传递
    updateLocation(type = 0) {
      return __async(this, null, function* () {
        if (type === 0) {
          this.orderInfo.orderStatus === config_constEnums.OrderStatus.ACCEPTED ? type = 1 : type = 2;
        }
        console.log("更新位置--------updateLocation------1:司机位置->出发地  2:司机位置->目的地", type);
        common_vendor.index.getLocation({
          type: "gcj02",
          success: (res) => {
            if (type === 1) {
              api_order_index.updateLocationCacheToStart({
                orderId: this.orderInfo.orderId,
                longitude: res.longitude,
                latitude: res.latitude
                // todo 地址位置写死：昌平区政府
                // longitude: 116.23128,
                // latitude: 40.22077
              });
              this.setCarFrom({
                address: res.address || this.from.address,
                longitude: res.longitude,
                latitude: res.latitude
                // todo 地址位置写死：昌平区政府
                // longitude: 116.23128,
                // latitude: 40.22077
              });
              this.driversPickUpPassengersRoutePlan();
            } else {
              if (this.orderInfo.orderStatus >= 5) {
                api_order_index.updateLocationCacheToEnd({
                  orderId: this.orderInfo.orderId,
                  longitude: res.longitude,
                  latitude: res.latitude
                  // todo 地址位置写死：昌平区政府
                  // longitude: 116.23128,
                  // latitude: 40.22077
                });
                this.setFrom({
                  address: res.address || this.to.address,
                  longitude: res.longitude,
                  latitude: res.latitude
                  // todo 地址位置写死：昌平区政府
                  // longitude: 116.23128,
                  // latitude: 40.22077
                });
                this.routePlan(2);
                this.orderCount3 = 0;
              } else {
                if (this.orderCount3 == 0) {
                  this.routePlan(2);
                }
                this.orderCount3++;
              }
            }
          }
        });
      });
    },
    // 查询订单状态
    getOrderStatusHandle() {
      return __async(this, null, function* () {
        const res = yield api_order_index.getOrderStatus(this.orderInfo.orderId);
        this.setOrderStatus(res.data);
      });
    },
    // 轮询查询订单状态
    queryOrderStatus() {
      return __async(this, arguments, function* (settingCallback = {}) {
        if (this.orderInfo.timer)
          return;
        this.orderCount3 = 0;
        this.stopQueryOrderStatus();
        this.orderInfo.timer = new class_TimerClass.TimerClass({
          time: 5e3,
          callback: () => __async(this, null, function* () {
            yield this.getOrderStatusHandle();
            yield this.updateLocation();
            switch (this.orderInfo.orderStatus) {
              case config_constEnums.OrderStatus.WAITING_ACCEPT:
                console.log("OrderStatus.WAITING_ACCEPT");
                if (settingCallback.WAITING_ACCEPT) {
                  settingCallback.WAITING_ACCEPT();
                  delete settingCallback.WAITING_ACCEPT;
                }
                break;
              case config_constEnums.OrderStatus.ACCEPTED:
                console.log("OrderStatus.ACCEPTED");
                if (settingCallback.ACCEPTED) {
                  settingCallback.ACCEPTED();
                  delete settingCallback.ACCEPTED;
                }
                break;
              case config_constEnums.OrderStatus.DRIVER_ARRIVED:
                console.log("OrderStatus.DRIVER_ARRIVED");
                if (settingCallback.DRIVER_ARRIVED) {
                  settingCallback.DRIVER_ARRIVED();
                  delete settingCallback.DRIVER_ARRIVED;
                }
                break;
              case config_constEnums.OrderStatus.UPDATE_CART_INFO:
                console.log("OrderStatus.UPDATE_CART_INFO");
                if (settingCallback.UPDATE_CART_INFO) {
                  settingCallback.UPDATE_CART_INFO();
                  delete settingCallback.UPDATE_CART_INFO;
                }
                break;
              case config_constEnums.OrderStatus.START_SERVICE:
                console.log("OrderStatus.START_SERVICE", settingCallback.START_SERVICE);
                if (settingCallback.START_SERVICE) {
                  settingCallback.START_SERVICE();
                  delete settingCallback.START_SERVICE;
                }
                break;
              case config_constEnums.OrderStatus.END_SERVICE:
                console.log("OrderStatus.END_SERVICE");
                if (settingCallback.END_SERVICE) {
                  settingCallback.END_SERVICE();
                  delete settingCallback.END_SERVICE;
                }
                break;
              case config_constEnums.OrderStatus.UNPAID:
                console.log("OrderStatus.UNPAID");
                if (settingCallback.UNPAID) {
                  settingCallback.UNPAID();
                  delete settingCallback.UNPAID;
                }
                break;
              case config_constEnums.OrderStatus.PAID:
                console.log("OrderStatus.PAID");
                if (settingCallback.PAID) {
                  settingCallback.PAID();
                  delete settingCallback.PAID;
                }
                break;
              case config_constEnums.OrderStatus.CANCEL_ORDER:
                console.log("OrderStatus.CANCEL_ORDER");
                if (settingCallback.CANCEL_ORDER) {
                  settingCallback.CANCEL_ORDER();
                  delete settingCallback.CANCEL_ORDER;
                }
                break;
              default:
                console.log("default");
            }
          })
        });
        this.orderInfo.timer.start();
      });
    },
    stopQueryOrderStatus() {
      var _a;
      console.log("停止轮询订单状态--------stopQueryOrderStatus");
      (_a = this.orderInfo.timer) == null ? void 0 : _a.stop();
      this.orderInfo.timer = null;
    },
    // 轮询创建定时器，发送录音
    querySendRecord() {
      return __async(this, null, function* () {
        if (this.recordTimer)
          return;
        this.stopQuerySendRecord();
        this.recordTimer = new class_TimerClass.TimerClass({
          time: 5e3,
          callback: () => __async(this, null, function* () {
            var _a;
            (_a = this.recorderManagerInstance) == null ? void 0 : _a.stopRecord();
            this.recorderManagerInstance = new class_RecorderManagerClass.RecorderManagerClass({
              recordCallback: (res) => {
                console.log("res----", res);
                common_vendor.wx$1.uploadFile({
                  url: "http://localhost:8600/driver-api/monitor/upload",
                  //仅为示例，非真实的接口地址
                  filePath: res.tempFilePath,
                  header: { token: utils_storage.getToken() },
                  name: "file",
                  formData: {
                    orderId: this.orderInfo.orderId,
                    content: res.result
                  },
                  success(res2) {
                    console.log("res---uploadFile", res2);
                  }
                });
              }
            });
            this.recorderManagerInstance.startRecord();
          })
        });
        this.recordTimer.start();
      });
    },
    stopQuerySendRecord() {
      var _a;
      console.log("停止轮询生成录音--------stopQuerySendRecord");
      (_a = this.recordTimer) == null ? void 0 : _a.stop();
      this.recordTimer = null;
    },
    //   规划司机接乘客路径CarInfo
    driversPickUpPassengersRoutePlan() {
      return __async(this, null, function* () {
        const from = this.carInfo.from;
        const to = this.from;
        const params = {
          startPointLongitude: from.longitude,
          startPointLatitude: from.latitude,
          endPointLongitude: to.longitude,
          endPointLatitude: to.latitude
        };
        const res = yield api_order_index.getExpectOrder(params);
        const route = res.data;
        const duration = route.duration;
        const distance = route.distance;
        const polyline = [
          {
            points: formatPolyline(route.polyline),
            width: 6,
            color: "#05B473",
            arrowLine: true
          }
        ];
        const markers = [
          {
            id: 1,
            latitude: to.latitude,
            longitude: to.longitude,
            width: 25,
            height: 35,
            anchor: {
              x: 0.5,
              y: 0.5
            },
            iconPath: common_assets.endImgUrl
          },
          {
            id: 2,
            latitude: from.latitude,
            longitude: from.longitude,
            width: 25,
            height: 35,
            anchor: {
              x: 0.5,
              y: 0.5
            },
            iconPath: common_assets.driver
          }
        ];
        this.setCarRouteInfo({
          polyline,
          distance,
          duration,
          markers
        });
      });
    }
  }
});
exports.useTakeCarInfoStore = useTakeCarInfoStore;
