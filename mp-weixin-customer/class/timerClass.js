"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class TimerClass {
  constructor(params = {}) {
    //   存放定时器实例
    __publicField(this, "timer");
    //   定时器执行周期时间 ms
    __publicField(this, "time");
    //   定时器执行的回调函数
    __publicField(this, "callback");
    //   定时器是否正在运行
    __publicField(this, "isRunning");
    this.time = params.time || 3e3;
    this.callback = params.callback || (() => {
    });
    this.isRunning = false;
  }
  start() {
    if (this.isRunning) {
      return;
    }
    this.callback();
    this.isRunning = true;
    this.timer = setInterval(() => {
      this.callback();
    }, this.time);
  }
  stop() {
    if (!this.isRunning) {
      return;
    }
    this.isRunning = false;
    clearInterval(this.timer);
  }
}
exports.TimerClass = TimerClass;
