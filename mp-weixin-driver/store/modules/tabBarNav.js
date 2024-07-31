"use strict";
const common_vendor = require("../../common/vendor.js");
const tmui_tool_lib_tmpinia = require("../../tmui/tool/lib/tmpinia.js");
function getActiveColor() {
  var _a;
  const colorThemeCorlorName = tmui_tool_lib_tmpinia.useTmpiniaStore().tmStore.color;
  return colorThemeCorlorName ? (_a = tmui_tool_lib_tmpinia.useTmpiniaStore().tmStore.colorList.find((item) => item.name === colorThemeCorlorName)) == null ? void 0 : _a.value : "primary";
}
const useTabBarStore = common_vendor.defineStore({
  id: "app-tabBar-nav",
  state: () => ({
    activeNavIndex: 0,
    tabBarNavList: [
      {
        index: 0,
        activeColor: getActiveColor(),
        icon: "tmicon-collection-fill",
        text: "首页",
        pagePath: "/pages/index/index"
      },
      // {
      //   index: 1,
      //   activeColor: getActiveColor(),
      //   icon: 'tmicon-icon',
      //   text: '优惠券',
      //   pagePath: '/pages/coupon/coupon'
      // },
      {
        index: 1,
        activeColor: getActiveColor(),
        icon: "tmicon-userplus-fill",
        text: "个人中心",
        pagePath: "/pages/userCenter/userCenter"
      }
    ]
  }),
  actions: {
    setActiveNavIndex(index) {
      this.activeNavIndex = index;
    },
    //   更新主题色
    updateActiveNavActiveColor() {
      this.tabBarNavList.forEach((item) => {
        item.activeColor = getActiveColor();
      });
    }
  }
});
exports.useTabBarStore = useTabBarStore;
