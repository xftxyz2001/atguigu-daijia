"use strict";
const common_vendor = require("../../../common/vendor.js");
const language$2 = "English-US";
const en = {
  language: language$2,
  "index.search.subtext": "Fully compatible with vue3 TypeScript pinia component library",
  "index.search.tips": "Chinese/English name",
  "index.search.btntext": "search",
  "index.com.navtitle": "TMUI All platforms",
  "index.com.title": "Category Navigation",
  "index.com.tongyong": "Universal",
  "index.com.row": "Layout",
  "index.com.show": "Display",
  "index.com.form": "Form",
  "index.com.fd": "Reminder",
  "index.com.nav": "Navigation",
  "index.com.yewu": "Business",
  "index.com.other": "Other",
  "index.com.tubiao": "Chart",
  "index.com.tongyongSub": "can't translate",
  "index.com.rowSub": "can't translate",
  "index.com.showSub": "can't translate",
  "index.com.formSub": "can't translate",
  "index.com.fdSub": "can't translate",
  "index.com.navSub": "can't translate",
  "index.com.yewuSub": "can't translate",
  "index.com.otherSub": "can't translate",
  "index.com.tubiaoSub": "Echarts 5.3.2",
  "index.com.render": "Render",
  "index.com.renderSub": "cavas render",
  "index.com.pag": "PAG",
  "index.com.pagSub": "pag animation",
  "index.com.bottom": "TMUI3.0",
  "index.com.setLocal": "language setting",
  "index.com.autoDark": "followDark system",
  "index.com.love": "Action support",
  "index.com.loveSub": "Watch an ad",
  "index.com.themetext": "Dynamically switch theme sore of see docs",
  "index.com.themeGreen": "Yellow",
  "index.com.themeBlue": "Blue",
  "index.com.themeRed": "Red",
  "index.com.themeDefault": "Default",
  "index.com.themeCustText": "custom",
  "message.load.text": "Loading",
  "message.error.text": "Error",
  "message.info.text": "Tips",
  "message.warn.text": "Warning",
  "message.quest.text": "Question",
  "message.success.text": "Success",
  "message.disabled.text": "Disabled",
  "message.wait.text": "Waiting"
};
const language$1 = "简体-中国";
const zhHans = {
  language: language$1,
  "index.search.subtext": "全端兼容vue3 TypeScript pinia组件库",
  "index.search.tips": "组件中文/英文名称",
  "index.search.btntext": "搜索组件",
  "index.com.navtitle": "TMUI 全平台组件库",
  "index.com.title": "分类导航",
  "index.com.tongyong": "通用组件",
  "index.com.tongyongSub": "高频常用组件",
  "index.com.row": "布局组件",
  "index.com.rowSub": "布局排版",
  "index.com.show": "展示组件",
  "index.com.showSub": "常见数据展示",
  "index.com.form": "表单录入",
  "index.com.formSub": "数据提交类",
  "index.com.fd": "反馈类型",
  "index.com.fdSub": "提示弹层类组件",
  "index.com.nav": "导航类型",
  "index.com.navSub": "分页导航类",
  "index.com.yewu": "业务型组件",
  "index.com.yewuSub": "优惠券导购类",
  "index.com.other": "其它",
  "index.com.otherSub": "功能型组件",
  "index.com.tubiao": "图表组件",
  "index.com.tubiaoSub": "Echarts 5.3.2",
  "index.com.render": "tmCv",
  "index.com.renderSub": "canvas动画渲染",
  "index.com.pag": "PAG",
  "index.com.pagSub": "腾讯pag动画",
  "index.com.bottom": "TMUI3.0",
  "index.com.setLocal": "设置语言",
  "index.com.autoDark": "暗黑跟随系统",
  "index.com.love": "TMUI用户中心",
  "index.com.loveSub": "看广告赚积分",
  "index.com.themetext": "动态切换主题,默认主题见文档",
  "index.com.themeGreen": "小黄",
  "index.com.themeBlue": "蓝色",
  "index.com.themeRed": "红色",
  "index.com.themeDefault": "默认",
  "index.com.themeCustText": "自定",
  "message.load.text": "加载中",
  "message.error.text": "操作错误",
  "message.info.text": "提示信息",
  "message.warn.text": "警告信息",
  "message.quest.text": "似乎有问题",
  "message.success.text": "操作成功",
  "message.disabled.text": "禁止操作",
  "message.wait.text": "请稍候.."
};
const language = function(key) {
  const messages = {
    en,
    "zh-Hans": zhHans
  };
  let i18nConfig = {
    locale: common_vendor.index.getLocale(),
    // 获取已设置的语言
    messages
  };
  const i18n = common_vendor.createI18n(i18nConfig);
  return i18n.global.t(key);
};
const languageByGlobal = function() {
  const messages = {
    en,
    "zh-Hans": zhHans
  };
  let i18nConfig = {
    locale: common_vendor.index.getLocale(),
    // 获取已设置的语言
    messages
  };
  const i18n = common_vendor.createI18n(i18nConfig);
  return i18n;
};
exports.language = language;
exports.languageByGlobal = languageByGlobal;
