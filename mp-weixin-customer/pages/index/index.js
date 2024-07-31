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
const config_config = require("../../config/config.js");
const api_order_index = require("../../api/order/index.js");
const utils_storage = require("../../utils/storage.js");
require("../../common/assets.js");
require("../../class/timerClass.js");
require("../../config/constEnums.js");
require("../../http/index.js");
require("../../http/type.js");
require("../../store/modules/user.js");
require("../../api/user/index.js");
require("../../config/constant.js");
if (!Array) {
  const _easycom_tabbar_nav2 = common_vendor.resolveComponent("tabbar-nav");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tabbar_nav2 + _easycom_tm_app2)();
}
const _easycom_tabbar_nav = () => "../../components/tabbar-nav/tabbar-nav.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_tabbar_nav + _easycom_tm_app)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    common_vendor.index.createMapContext("map");
    const chooseLocation = requirePlugin("chooseLocation");
    const takeCarInfo = store_modules_takeCarInfo.useTakeCarInfoStore();
    const mapProps = common_vendor.ref({
      // 中心经度
      longitude: 116.397505,
      // 中心纬度
      latitude: 39.908675
    });
    const flag = common_vendor.ref("from");
    function setFromOrToLocation(type) {
      flag.value = type;
      const key = config_config.QqMapkey;
      const referer = "硅谷代驾";
      const location = JSON.stringify({
        latitude: mapProps.value.latitude,
        longitude: mapProps.value.longitude
      });
      common_vendor.index.navigateTo({
        url: `plugin://chooseLocation/index?key=${key}&referer=${referer}&location=${location}`
      });
      console.log(key, referer);
    }
    common_vendor.onShow(() => __async(this, null, function* () {
      common_vendor.index.hideTabBar();
      if (utils_storage.getToken()) {
        const { data } = yield api_order_index.findCustomerCurrentOrder();
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
      console.log("onShow-chooseLocation", chooseLocation);
      const location = chooseLocation.getLocation();
      console.log("location", location);
      if (!location) {
        takeCarInfo.$reset();
        return;
      }
      if (flag.value === "from") {
        takeCarInfo.from = location;
      } else {
        takeCarInfo.to = location;
      }
      if (takeCarInfo.from.address && takeCarInfo.to.address) {
        const { data } = yield api_order_index.findCustomerCurrentOrder();
        if (data.isHasCurrentOrder) {
          common_vendor.index.showModal({
            title: "提示",
            content: "您有未完成的订单，是否去往导航页？",
            success: function(res) {
              if (res.confirm) {
                common_vendor.index.navigateTo({
                  url: "/pages/creatOrder/creatOrder?orderId=" + data.orderId
                });
              } else if (res.cancel) {
                common_vendor.index.navigateTo({
                  url: "/pages/creatOrder/creatOrder"
                });
              }
            }
          });
          return;
        } else {
          common_vendor.index.navigateTo({
            url: "/pages/creatOrder/creatOrder"
          });
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
    common_vendor.onHide(() => {
      chooseLocation.setLocation(null);
    });
    common_vendor.onUnload(() => {
      chooseLocation.setLocation(null);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(takeCarInfo).from.address || "请选择出发地"),
        b: common_vendor.o(($event) => setFromOrToLocation("from")),
        c: common_vendor.t(common_vendor.unref(takeCarInfo).to.address || "请选择目的地"),
        d: common_vendor.o(($event) => setFromOrToLocation("to")),
        e: mapProps.value.longitude,
        f: mapProps.value.latitude
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-83a5a03c"], ["__file", "D:/work/daijia_work/web/mp-weixin-customer/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
