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
const store_modules_takeCarInfo = require("../../store/modules/takeCarInfo.js");
const hooks_useTimeIncrease = require("../../hooks/useTimeIncrease.js");
const hooks_useCountdown = require("../../hooks/useCountdown.js");
const store_modules_receiveOrder = require("../../store/modules/receiveOrder.js");
const api_order_index = require("../../api/order/index.js");
const api_user_index = require("../../api/user/index.js");
const utils_storage = require("../../utils/storage.js");
require("../../common/assets.js");
require("../../class/TimerClass.js");
require("../../config/constEnums.js");
require("../../class/RecorderManagerClass.js");
require("../../class/timerClass2.js");
require("../../http/index.js");
require("../../http/type.js");
require("../../store/modules/user.js");
require("../../config/constant.js");
if (!Array) {
  const _easycom_theme_icon2 = common_vendor.resolveComponent("theme-icon");
  const _easycom_loading_button2 = common_vendor.resolveComponent("loading-button");
  const _easycom_tm_sheet2 = common_vendor.resolveComponent("tm-sheet");
  const _easycom_tabbar_nav2 = common_vendor.resolveComponent("tabbar-nav");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_theme_icon2 + _easycom_loading_button2 + _easycom_tm_sheet2 + _easycom_tabbar_nav2 + _easycom_tm_app2)();
}
const _easycom_theme_icon = () => "../../components/theme-icon/theme-icon.js";
const _easycom_loading_button = () => "../../components/loading-button/loading-button.js";
const _easycom_tm_sheet = () => "../../tmui/components/tm-sheet/tm-sheet.js";
const _easycom_tabbar_nav = () => "../../components/tabbar-nav/tabbar-nav.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_theme_icon + _easycom_loading_button + _easycom_tm_sheet + tmNotification + _easycom_tabbar_nav + _easycom_tm_app)();
}
const tmNotification = () => "../../tmui/components/tm-notification/tm-notification.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const receiveOrder = store_modules_receiveOrder.useReceiveOrder();
    const descriptionsOrder = common_vendor.computed(() => {
      return [
        { label: "预估里程", value: (receiveOrder == null ? void 0 : receiveOrder.currentOrder.expectDistance) + "KM" },
        { label: "距离客人距离", value: (receiveOrder == null ? void 0 : receiveOrder.currentOrder.distance) + "KM" },
        { label: "预估费用", value: (receiveOrder == null ? void 0 : receiveOrder.currentOrder.expectAmount) + "元" }
      ];
    });
    const map = common_vendor.index.createMapContext("map");
    store_modules_takeCarInfo.useTakeCarInfoStore();
    const mapProps = common_vendor.ref({
      // 中心经度
      longitude: 116.397505,
      // 中心纬度
      latitude: 39.908675
    });
    function moveToLocationHandle() {
      map.moveToLocation(mapProps.value);
    }
    const popRef = common_vendor.ref(null);
    const timeCountdown = hooks_useCountdown.useCountdown({
      // 倒计时长
      seconds: 5,
      // 回调函数,到达持续时长后执行
      callback: () => {
        console.log("倒计时结束");
        closePopupHandle();
      }
    });
    function openPopupHandle() {
      var _a;
      (_a = popRef.value) == null ? void 0 : _a.show();
      timeCountdown.start();
      console.log("打开弹出层openPopupHandle");
    }
    function closePopupHandle() {
      var _a;
      (_a = popRef.value) == null ? void 0 : _a.hide();
      timeCountdown.stopAndReset();
      console.log("关闭弹出层closePopupHandle");
    }
    function confirmTakingOrdersHandle() {
      return __async(this, null, function* () {
        console.log("确认抢单confirmTakingOrdersHandle");
        yield receiveOrder.grabOrder();
        yield receiveOrder.stopOrderService();
        yield cancelTakingOrdersHandle();
        yield common_vendor.index.navigateTo({
          url: "/pages/creatOrder/creatOrder?orderId=" + receiveOrder.currentOrder.orderId
        });
      });
    }
    function cancelTakingOrdersForCustomerHandle() {
      closePopupHandle();
      console.log("取消接单cancelTakingOrdersForCustomerHandle");
    }
    function receivePushOrderHandle() {
      openPopupHandle();
    }
    const timeIncrease = hooks_useTimeIncrease.useTimeIncrease();
    const isTakingOrders = common_vendor.ref(false);
    function startTakingOrdersHandle() {
      return __async(this, null, function* () {
        console.log("开始接单startTakingOrdersHandle");
        const isAllowTakeOrder = yield isTakeOrder();
        console.log("isAllowTakeOrder", isAllowTakeOrder);
        if (!isAllowTakeOrder)
          return;
        const { data } = yield api_order_index.searchDriverCurrentOrder();
        if (data.isHasCurrentOrder) {
          common_vendor.index.showModal({
            title: "提示",
            content: "您有未完成的订单，是否去往导航页？",
            success: function(res) {
              if (res.confirm) {
                common_vendor.index.navigateTo({
                  url: "/pages/creatOrder/creatOrder?orderId=" + data.orderId
                });
              }
            }
          });
          return;
        }
        yield receiveOrder.startOrderService();
        isTakingOrders.value = true;
        timeIncrease.start();
        yield receiveOrder.queryGetNewOrder();
        yield receiveOrder.querySwitchCurrentOrder(receivePushOrderHandle);
      });
    }
    function cancelTakingOrdersHandle() {
      return __async(this, null, function* () {
        console.log("取消订单cancelOrderHandle");
        isTakingOrders.value = false;
        timeIncrease.stopAndReset();
        receiveOrder.stopQueryGetNewOrder();
        receiveOrder.stopQuerySwitchCurrentOrder();
        closePopupHandle();
        yield api_order_index.stopService();
      });
    }
    function isTakeOrder() {
      return __async(this, null, function* () {
        const resList = yield Promise.all([api_user_index.getDriverLoginInfo()]);
        console.log("resList----", resList);
        const driverLoginInfo = resList[0].data;
        if (driverLoginInfo.authStatus === 0) {
          yield common_vendor.index.showToast({ title: "未认证，跳转认证页面", icon: "none" });
          setTimeout(() => {
            common_vendor.index.navigateTo({
              url: "/pages/verification/verification"
            });
          }, 1e3);
        } else if (driverLoginInfo.authStatus === 1) {
          yield common_vendor.index.showToast({ title: "正在审核中", icon: "none" });
        } else if (driverLoginInfo.authStatus === -1) {
          yield common_vendor.index.showToast({ title: "认证未通过，跳转认证页面重新认证", icon: "none" });
          setTimeout(() => {
            common_vendor.index.navigateTo({
              url: "/pages/verification/verification"
            });
          }, 1e3);
        } else {
          if (driverLoginInfo.isArchiveFace) {
            const isFaceRecognition = yield api_user_index.getDriverIsFaceRecognition();
            if (isFaceRecognition.data) {
              return true;
            } else {
              yield common_vendor.index.showToast({ title: "今日未曾人脸识，跳转识别", icon: "none" });
              setTimeout(() => {
                common_vendor.index.navigateTo({
                  url: "/pages/facialIdentification/facialIdentification"
                });
              }, 1e3);
            }
          } else {
            yield common_vendor.index.showToast({ title: "未录入人脸信息，跳转录入", icon: "none" });
            setTimeout(() => {
              common_vendor.index.navigateTo({
                url: "/pages/facialIdentification/facialIdentification?creatFaceModel=true"
              });
            }, 1e3);
          }
        }
      });
    }
    common_vendor.onShow(() => __async(this, null, function* () {
      common_vendor.index.hideTabBar();
      if (utils_storage.getToken()) {
        const { data } = yield api_order_index.searchDriverCurrentOrder();
        if (data.isHasCurrentOrder) {
          common_vendor.index.showModal({
            title: "提示",
            content: "您有未完成的订单，是否去往导航页？",
            success: function(res) {
              if (res.confirm) {
                common_vendor.index.navigateTo({
                  url: "/pages/creatOrder/creatOrder?orderId=" + data.orderId
                });
              }
            }
          });
          return;
        }
      }
    }));
    common_vendor.onLoad(() => {
      common_vendor.index.getLocation({
        type: "gcj02",
        success: function(res) {
          mapProps.value.longitude = res.longitude;
          mapProps.value.latitude = res.latitude;
        }
      });
    });
    return (_ctx, _cache) => {
      var _a, _b;
      return common_vendor.e({
        a: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: "iconfontditudingwei",
          size: "30"
        }),
        b: common_vendor.o(($event) => moveToLocationHandle()),
        c: common_vendor.unref(mapProps).longitude,
        d: common_vendor.unref(mapProps).latitude,
        e: common_vendor.unref(isTakingOrders)
      }, common_vendor.unref(isTakingOrders) ? {
        f: common_vendor.t(`${common_vendor.unref(timeIncrease).timeDateTypeInfo.value.hours}:${common_vendor.unref(timeIncrease).timeDateTypeInfo.value.minutes}:${common_vendor.unref(timeIncrease).timeDateTypeInfo.value.seconds}`)
      } : {}, {
        g: common_vendor.unref(isTakingOrders)
      }, common_vendor.unref(isTakingOrders) ? {
        h: common_vendor.p({
          block: true,
          ["click-fun"]: cancelTakingOrdersHandle,
          margin: [10],
          shadow: 0,
          size: "large",
          label: "取消接单"
        })
      } : {}, {
        i: !common_vendor.unref(isTakingOrders)
      }, !common_vendor.unref(isTakingOrders) ? {
        j: common_vendor.p({
          block: true,
          ["click-fun"]: startTakingOrdersHandle,
          margin: [10],
          shadow: 0,
          size: "large",
          label: "开始接单"
        })
      } : {}, {
        k: common_vendor.p({
          round: 3,
          shadow: 2
        }),
        l: common_vendor.t((_a = common_vendor.unref(receiveOrder)) == null ? void 0 : _a.currentOrder.startLocation),
        m: common_vendor.t((_b = common_vendor.unref(receiveOrder)) == null ? void 0 : _b.currentOrder.endLocation),
        n: common_vendor.f(common_vendor.unref(descriptionsOrder), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: common_vendor.t(item.value),
            c: item.label
          };
        }),
        o: common_vendor.t(`${common_vendor.unref(timeCountdown).timeDateTypeInfo.value.hours}:${common_vendor.unref(timeCountdown).timeDateTypeInfo.value.minutes}:${common_vendor.unref(timeCountdown).timeDateTypeInfo.value.seconds}`),
        p: common_vendor.p({
          width: 200,
          ["click-fun"]: cancelTakingOrdersForCustomerHandle,
          margin: [30],
          shadow: 0,
          size: "large",
          label: "取消",
          type: "info"
        }),
        q: common_vendor.p({
          width: 200,
          ["click-fun"]: confirmTakingOrdersHandle,
          margin: [30],
          shadow: 0,
          size: "large",
          label: "抢单"
        }),
        r: common_vendor.p({
          round: 3,
          shadow: 2
        }),
        s: common_vendor.sr(popRef, "83a5a03c-5,83a5a03c-0", {
          "k": "popRef"
        }),
        t: common_vendor.p({
          transprent: true,
          duration: 5e4,
          placement: "top"
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-83a5a03c"], ["__file", "D:/work/daijia_work/web/mp-weixin-driver/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
