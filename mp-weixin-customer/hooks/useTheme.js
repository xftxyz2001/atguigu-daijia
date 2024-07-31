"use strict";
const common_vendor = require("../common/vendor.js");
const tmui_tool_lib_tmpinia = require("../tmui/tool/lib/tmpinia.js");
const store_modules_tabBarNav = require("../store/modules/tabBarNav.js");
const useTheme = () => {
  const tmPiniaStore = tmui_tool_lib_tmpinia.useTmpiniaStore();
  const toggleDarkOrLight = () => {
    tmPiniaStore.setTmVuetifyDark(!tmPiniaStore.tmStore.dark);
  };
  const toggleThemeColor = (color) => {
    var _a;
    color = color.trim().toLocaleUpperCase();
    if (!color) {
      common_vendor.index.showToast({
        title: "颜色不能为空"
      });
    }
    tmPiniaStore.setTmVuetifyAddTheme(`name-${color}`, color);
    (_a = store_modules_tabBarNav.useTabBarStore()) == null ? void 0 : _a.updateActiveNavActiveColor();
  };
  const toggleThemeColorByColorThemeName = (colorName) => {
    var _a;
    const color = (_a = tmPiniaStore.tmStore.colorList.find((item) => item.name === colorName)) == null ? void 0 : _a.value;
    if (!color)
      return;
    toggleThemeColor(color);
  };
  const getThemeColor = () => {
    var _a, _b;
    return ((_a = tmPiniaStore.tmStore.colorList.find((item) => item.name === tmPiniaStore.tmStore.color)) == null ? void 0 : _a.value) || ((_b = tmPiniaStore.tmStore.colorList.find((item) => item.name === "primary")) == null ? void 0 : _b.value) || "";
  };
  const themeColor = common_vendor.computed(() => {
    const themeColorName = tmPiniaStore.tmStore.color;
    if (themeColorName) {
      return getThemeColor();
    }
    return getThemeColor();
  });
  return {
    themeColor,
    tmPiniaStore,
    getThemeColor,
    toggleDarkOrLight,
    toggleThemeColor,
    toggleThemeColorByColorThemeName
  };
};
exports.useTheme = useTheme;
