"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const plugin = requirePlugin("WechatSI");
class RecorderManagerClass {
  constructor(params) {
    //   录音管理器实例
    __publicField(this, "recorderManager");
    //   录音文件的持续时长
    __publicField(this, "maxDuration");
    //   是否正在录制
    __publicField(this, "isRecording");
    //   录音开始时间
    __publicField(this, "startTime");
    //   录音结束时间
    __publicField(this, "endTime");
    //   录音时长
    __publicField(this, "recordTime");
    //   录音时长定时器
    __publicField(this, "recordTimer");
    //   录音时长回调函数
    __publicField(this, "recordCallback");
    this.maxDuration = (params == null ? void 0 : params.maxDuration) || 60;
    this.isRecording = false;
    this.startTime = 0;
    this.endTime = 0;
    this.recordTime = 0;
    this.recordTimer = null;
    this.recordCallback = (params == null ? void 0 : params.recordCallback) || (() => {
    });
  }
  //   开始录音
  startRecord() {
    if (this.isRecording) {
      return;
    }
    this.recorderManager = plugin.getRecordRecognitionManager();
    this.isRecording = true;
    this.startTime = (/* @__PURE__ */ new Date()).getTime();
    this.onRecordEnd();
    this.recorderManager.start({ duration: 6e4, lang: "zh_CN" });
    this.recordTimer = setInterval(() => {
      console.log("this.recordTime", this.recordTime);
      if (this.maxDuration && this.recordTime >= this.maxDuration) {
        this.stopRecord();
      }
      this.recordTime++;
    }, 1e3);
  }
  //   停止录音
  stopRecord() {
    console.log("停止录音-1");
    if (!this.isRecording) {
      return;
    }
    console.log("停止录音-2");
    this.isRecording = false;
    this.endTime = (/* @__PURE__ */ new Date()).getTime();
    this.recorderManager.stop();
    this.recorderManager = null;
    clearInterval(this.recordTimer);
    this.reset();
  }
  //   监听录音结束事件
  onRecordEnd() {
    this.recorderManager.onStop = (res) => {
      this.recordCallback({
        tempFilePath: res.tempFilePath,
        duration: res.duration,
        fileSize: res.fileSize,
        result: res.result
      });
    };
  }
  //   重置所有参数
  reset() {
    this.isRecording = false;
    this.startTime = 0;
    this.endTime = 0;
    this.recordTime = 0;
    this.recordTimer = null;
  }
}
exports.RecorderManagerClass = RecorderManagerClass;
