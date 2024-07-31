"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const store_index = require("./store/index.js");
const tmui_index = require("./tmui/index.js");
const config_tmConfig = require("./config/tmConfig.js");
require("./tmui/tool/lib/fetch.js");
require("./tmui/tool/function/util.js");
require("./tmui/tool/function/preview.js");
require("./tmui/tool/lib/language.js");
require("./tmui/tool/lib/share.js");
require("./tmui/tool/lib/tmuiconfigDefault.js");
require("./tmui/tool/router/index.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/coupon/coupon.js";
  "./pages/userCenter/userCenter.js";
  "./pages/creatOrder/creatOrder.js";
  "./pages/orderList/orderList.js";
  "./pages/orderDetail/orderDetail.js";
  "./pages/login/login.js";
  "./pages/paySuccess/paySuccess.js";
}
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  return {};
}
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/work/daijia_work/web/mp-weixin-customer/src/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(store_index.pinia);
  app.use(tmui_index.tmui, config_tmConfig.tmConfig);
  return {
    app,
    pinia: store_index.pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
