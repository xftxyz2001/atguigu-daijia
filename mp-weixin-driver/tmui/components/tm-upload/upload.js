"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
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
const common_vendor = require("../../../common/vendor.js");
var statusCode = /* @__PURE__ */ ((statusCode2) => {
  statusCode2[statusCode2["upload"] = 0] = "upload";
  statusCode2[statusCode2["uploading"] = 1] = "uploading";
  statusCode2[statusCode2["fail"] = 2] = "fail";
  statusCode2[statusCode2["success"] = 3] = "success";
  statusCode2[statusCode2["max"] = 4] = "max";
  return statusCode2;
})(statusCode || {});
function getUid(length = 3) {
  return Number(Number(Math.random().toString().substr(3, length) + Date.now()).toString(8));
}
class uploadfile {
  constructor(config) {
    //文件列表。
    __publicField(this, "filelist", []);
    __publicField(this, "isStop", false);
    __publicField(this, "index", 0);
    __publicField(this, "config", {});
    __publicField(this, "uploadobj", null);
    var _a;
    let cf = { maxSize: 10 * 1024 * 1024, maxFile: 9, fileType: ["album", "camera"], fileList: [], autoUpload: true, header: {}, formData: {}, formName: "file" };
    cf = __spreadValues(__spreadValues({}, cf), (_a = arguments[0]) != null ? _a : {});
    this.config = cf;
    this.addFile(cf.fileList);
    delete this.config.fileList;
  }
  beforeChooesefile() {
    return __async(this, null, function* () {
      return true;
    });
  }
  chooesefileAfter(fileList) {
    return __async(this, null, function* () {
      return fileList;
    });
  }
  chooesefileSuccess(fileList) {
    return __async(this, null, function* () {
      return fileList;
    });
  }
  delete(item) {
    let index = this.filelist.findIndex((el) => el.uid == item.uid);
    if (index > -1) {
      let p = [...this.filelist];
      p.splice(index, 1);
      this.filelist = [...p];
    }
    return this.filelist;
  }
  clear() {
    return __async(this, null, function* () {
      this.stop();
      this.filelist = [];
    });
  }
  setFileStatus(item) {
    let index = this.filelist.findIndex((el) => el.uid == item.uid);
    if (index > -1) {
      let p = [...this.filelist];
      p.splice(index, 1, item);
      this.filelist = [...p];
    }
  }
  /**
   * 成功后返回选择后的图片列表。
   */
  chooesefile() {
    return __async(this, null, function* () {
      let t = this;
      return new Promise((rs, rj) => __async(this, null, function* () {
        let isready = yield t.beforeChooesefile();
        if (!isready) {
          rs([]);
          return;
        }
        common_vendor.index.chooseImage({
          count: t.config.maxFile,
          sourceType: t.config.fileType,
          fail: (e) => {
            rj("取消选择");
          },
          success: (res) => __async(this, null, function* () {
            if (res.tempFilePaths.length == 0) {
              rj("未选择");
              return;
            }
            let imgarray = res.tempFilePaths;
            let fielist = res.tempFiles;
            let jgsk = [];
            imgarray.forEach((item, index) => {
              var _a;
              let isMaxsize = fielist[index].size > t.config.maxSize ? true : false;
              jgsk.push({
                url: item,
                status: isMaxsize ? "超过大小" : "待上传",
                progress: isMaxsize ? 100 : 0,
                uid: getUid(),
                statusCode: isMaxsize ? 4 : 0,
                response: null,
                name: (_a = fielist[index].name) != null ? _a : ""
              });
            });
            let isreadyChoose = yield t.chooesefileAfter(jgsk);
            if (!Array.isArray(isreadyChoose) || typeof isreadyChoose != "object") {
              rj("chooesefileAfter:函数过滤，没有返回文件列表。");
              return;
            }
            t.filelist.push(...isreadyChoose);
            t.chooesefileSuccess(isreadyChoose);
            rs(isreadyChoose);
            if (t.config.autoUpload) {
              setTimeout(function() {
                t.start();
              }, 500);
            }
          })
        });
      }));
    });
  }
  chooseMPH5weixinFile() {
    return __async(this, null, function* () {
      let t = this;
      return new Promise((rs, rj) => {
        var _a;
        var fs = common_vendor.index.chooseFile;
        fs = common_vendor.index.chooseMessageFile;
        var config = {
          count: t.config.maxfile,
          type: t.config.type,
          extension: t.config.extension
        };
        if (!t.config.extension || !Array.isArray(t.config.extension) || ((_a = t.config.extension) == null ? void 0 : _a.length) == 0) {
          delete config.extension;
        }
        fs(__spreadProps(__spreadValues({}, config), {
          fail: (e) => {
            console.error(e);
            common_vendor.index.$tm.toast("已取消选择");
            rj(e);
          },
          success: (res) => {
            if (res.tempFiles.length == 0) {
              common_vendor.index.$tm.toast("未选择");
              return;
            }
            let fielist = res.tempFiles;
            let jgsk = [];
            fielist.forEach((item, index) => {
              let isMaxsize = fielist[index].size > t.config.maxsize ? true : false;
              let ftype = item.name || "";
              if (ftype) {
                ftype = ftype.substr(ftype.lastIndexOf(".") + 1).toLocaleLowerCase();
              }
              jgsk.push({
                url: item.path,
                name: item.name || "默认文件名称",
                type: ftype,
                status: isMaxsize ? "超过大小" : "待上传",
                progress: isMaxsize ? 100 : 0,
                fileId: guid(),
                statusCode: isMaxsize ? 4 : 0,
                data: null
                //上传成功后的回调数据。
              });
            });
            t.filelist.push(...jgsk);
            t.selected(t.filelist);
            if (t.config.isAuto) {
              t.start();
            }
            rs(t.filelist);
          }
        }));
      });
    });
  }
  setConfig(config) {
    this.config = __spreadValues(__spreadValues({}, this.config), config != null ? config : {});
  }
  /**
   * 动态加入文件
   * @param {Object} filelist
   */
  addFile(filelist = []) {
    if (typeof filelist !== "object" && !Array.isArray(filelist))
      return;
    let total_uid = new Set(this.filelist.map((e) => e.uid));
    let total_url = new Set(this.filelist.map((e) => e.url));
    let cfilelist = filelist.map((el) => {
      var _a, _b, _c, _d, _e, _f, _g;
      return __spreadProps(__spreadValues({}, el), {
        status: (_a = el == null ? void 0 : el.status) != null ? _a : "待上传",
        statusCode: (_b = el == null ? void 0 : el.statusCode) != null ? _b : 0,
        uid: (_c = el == null ? void 0 : el.uid) != null ? _c : getUid(),
        progress: (_d = el == null ? void 0 : el.progress) != null ? _d : 0,
        name: (_e = el == null ? void 0 : el.name) != null ? _e : "",
        response: (_f = el == null ? void 0 : el.response) != null ? _f : null,
        url: (_g = el == null ? void 0 : el.url) != null ? _g : ""
      });
    });
    let filterFIle = cfilelist.filter((item) => !total_uid.has(item.uid) && !total_url.has(item.url));
    this.filelist.push(...filterFIle);
  }
  beforeSuccess(item) {
    return Promise.resolve(true);
  }
  beforeStart(item) {
    return Promise.resolve(true);
  }
  // 进度。
  progress(item, index) {
  }
  // 失败
  fail(item) {
  }
  // 成功
  success(item, fileList) {
  }
  // 完成。
  complete(filelist) {
  }
  uploadComplete(filelist) {
  }
  awaitTime() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 20);
    });
  }
  // 开始上传。
  start() {
    return __async(this, null, function* () {
      if (this.filelist.length <= 0) {
        console.error("未选择图片,已取消上传");
        return;
      }
      let t = this;
      this.index = 0;
      this.isStop = false;
      function startupload() {
        return __async(this, null, function* () {
          var _a, _b, _c, _d;
          if (t.isStop)
            return;
          let item = t.filelist[t.index];
          if (!item || typeof item === "undefined") {
            t.uploadComplete(t.filelist);
            return;
          }
          let canbleStart = yield t.beforeStart(item);
          if (!canbleStart) {
            item.statusCode = 2;
            item.status = "不允许上传";
            t.filelist.splice(t.index, 1, item);
            t.index++;
            t.setFileStatus(item);
            t.fail(item);
            t.complete(item);
            startupload();
            return;
          }
          if (item.statusCode == 3 || item.statusCode == 1 || item.statusCode == 4 || item.statusCode == 2) {
            t.index++;
            startupload();
            return;
          }
          item.statusCode = 1;
          item.status = "上传中...";
          t.setFileStatus(item);
          const upObj = t.uploadobj = common_vendor.index.uploadFile({
            url: String(t.config.hostUrl),
            name: (_b = (_a = t.config) == null ? void 0 : _a.formName) != null ? _b : "file",
            header: (_d = (_c = t.config) == null ? void 0 : _c.header) != null ? _d : {},
            filePath: item.url,
            formData: __spreadValues({ name: item.name }, t.config.formData),
            success: (res) => __async(this, null, function* () {
              var _a2, _b2;
              if (t.isStop)
                return;
              item.response = res.data;
              let isOksuccess = yield t.beforeSuccess(item);
              const statusCode_reonese = (_b2 = (_a2 = t.config) == null ? void 0 : _a2.statusCode) != null ? _b2 : 200;
              if (res.statusCode != statusCode_reonese || !isOksuccess) {
                item.statusCode = 2;
                item.status = "上传失败";
                t.fail(item);
                t.setFileStatus(item);
                t.index++;
                return;
              }
              item.statusCode = 3;
              item.status = "上传成功";
              t.setFileStatus(item);
              t.success(item, t.filelist);
              t.index++;
            }),
            fail: (res) => {
              if (t.isStop)
                return;
              item.statusCode = 2;
              item.status = "上传失败";
              t.setFileStatus(item);
              t.fail(item);
              t.index++;
            },
            complete: (res) => __async(this, null, function* () {
              if (t.isStop)
                return;
              yield t.awaitTime();
              t.complete(item);
              startupload();
            })
          });
          if (upObj) {
            let item2 = t.filelist[t.index];
            upObj.onProgressUpdate((res) => __async(this, null, function* () {
              if (t.isStop)
                return;
              item2.progress = res.progress;
              item2.statusCode = 1;
              item2.status = "...";
              t.setFileStatus(item2);
              t.progress(item2, t.index);
            }));
          }
        });
      }
      yield startupload();
    });
  }
  // 停止上传
  stop() {
    this.isStop = true;
    if (this.uploadobj != null) {
      this.uploadobj.abort();
    }
  }
}
exports.statusCode = statusCode;
exports.uploadfile = uploadfile;
