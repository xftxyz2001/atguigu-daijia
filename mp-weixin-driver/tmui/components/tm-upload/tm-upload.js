"use strict";
var __defProp = Object.defineProperty;
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
const tmui_components_tmUpload_upload = require("./upload.js");
if (!Math) {
  (tmIcon + tmText + tmImage + tmSheet)();
}
const tmImage = () => "../tm-image/tm-image.js";
const tmText = () => "../tm-text/tm-text.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-upload",
  props: {
    //是否跟随全局主题的变换而变换
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    width: {
      type: Number,
      default: 700
    },
    //一行排列几个。
    rows: {
      type: Number,
      default: 5
    },
    //图片的高度
    imageHeight: {
      type: Number,
      default: 140
    },
    imageModel: {
      type: String,
      default: "scaleToFill"
    },
    defaultValue: {
      type: Array,
      default: () => []
    },
    //可以是双向绑定
    modelValue: {
      type: Array,
      default: () => []
    },
    color: {
      type: String,
      default: "primary"
    },
    header: {
      type: Object,
      default: () => {
      }
    },
    formData: {
      type: Object,
      default: () => {
      }
    },
    maxFile: {
      type: Number,
      default: 9
    },
    maxSize: {
      type: Number,
      default: 10 * 1024 * 1024
    },
    url: {
      type: String,
      default: "",
      required: true
    },
    formName: {
      type: String,
      default: "file"
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    //删除前执行，如果返回false,将阻止删除。
    onRemove: {
      type: [Function, Boolean],
      default: () => {
        return (item) => true;
      }
    },
    //开始上传前执行，如果返false，将阻止上传，
    onStart: {
      type: [Function, Boolean],
      default: () => {
        return (item) => true;
      }
    },
    //上传成功后，从服务器响应后立即执行，此时，还未更改当前文件上传的状态，是成功还是失败
    //如果此时返回false,将会让文件状态从成功改为上传失败，尽管 从服务器正确返回，但仍然显示失败。
    onSuccessAfter: {
      type: [Function, Boolean],
      default: () => {
        return (item) => true;
      }
    },
    //选择文件前执行，如果此时返回false,将阻止选择文件。你可以在这里做一些上传前的配置。
    beforeChooese: {
      type: [Function, Boolean],
      default: () => {
        return (item) => true;
      }
    },
    chooesefileAfter: {
      type: [Function, Boolean],
      default: () => {
        return (item) => item;
      }
    },
    //是否显示排序功能
    showSort: {
      type: Boolean,
      default: false
    },
    /**文件选择的类型
     * album,相册，camera：相机
     */
    fileType: {
      type: Array,
      default: ["album", "camera"]
    },
    /**服务器返回的状态码，默认200成功 */
    statusCode: {
      type: Number,
      default: 200
    },
    showStatus: {
      type: Boolean,
      default: true
    }
  },
  emits: ["success", "fail", "complete", "change", "remove", "uploadComplete", "update:modelValue"],
  setup(__props, { expose, emit: emits }) {
    var _a, _b;
    const props = __props;
    (_b = (_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    let timeId = NaN;
    const itemWidth = common_vendor.computed(() => {
      return props.width / props.rows;
    });
    const itemHeight = common_vendor.computed(() => {
      return props.imageHeight;
    });
    const _uploadObj = new tmui_components_tmUpload_upload.uploadfile({
      formName: props.formName,
      hostUrl: props.url,
      autoUpload: props.autoUpload,
      fileList: addSuccess(props.defaultValue),
      header: props.header,
      formData: props.formData,
      maxFile: props.maxFile,
      maxSize: props.maxSize,
      fileType: props.fileType,
      statusCode: props.statusCode
    });
    const _flist = common_vendor.ref([]);
    const _disabled = common_vendor.computed(() => props.disabled);
    const _disabledAdd = common_vendor.computed(() => {
      return props.disabled || _flist.value.length >= props.maxFile;
    });
    emits("update:modelValue", addSuccess(props.defaultValue));
    _flist.value = [..._uploadObj.filelist];
    common_vendor.index.$tm.u.deepClone(common_vendor.toRaw(_uploadObj.filelist));
    common_vendor.watch(
      [() => props.header, () => props.maxFile, () => props.maxSize, () => props.formData],
      () => {
        _uploadObj.setConfig({
          formName: props.formName,
          hostUrl: props.url,
          header: props.header,
          formData: props.formData,
          maxFile: props.maxFile,
          maxSize: props.maxSize
        });
      },
      { deep: true }
    );
    function prevSort(item, index, type) {
      if (index == 0 && type == "prev" || index == _flist.value.length - 1 && type == "next") {
        return;
      }
      let nowindex = type == "prev" ? index - 1 : index + 1;
      let nowItem = common_vendor.toRaw(_flist.value[index]);
      let newnowItem = common_vendor.toRaw(_flist.value[nowindex]);
      let nowfilelist = common_vendor.index.$tm.u.deepClone(common_vendor.toRaw(_uploadObj.filelist));
      nowfilelist.splice(index, 1, newnowItem);
      nowfilelist.splice(nowindex, 1, nowItem);
      _uploadObj.filelist = [...nowfilelist];
      _flist.value = [..._uploadObj.filelist];
      emits("update:modelValue", nowfilelist);
    }
    function addSuccess(fileList = []) {
      let fl = fileList.map((e) => {
        var _a2, _b2, _c;
        let _itemfile = { url: "" };
        if (typeof e == "string") {
          _itemfile.url = e;
        } else {
          _itemfile = __spreadValues({}, e);
        }
        _itemfile = __spreadValues({
          statusCode: (_a2 = e == null ? void 0 : e.statusCode) != null ? _a2 : tmui_components_tmUpload_upload.statusCode.success,
          status: (_b2 = e == null ? void 0 : e.status) != null ? _b2 : "上传成功",
          progress: (_c = e == null ? void 0 : e.progress) != null ? _c : 100
        }, _itemfile);
        return _itemfile;
      });
      return fl;
    }
    _uploadObj.beforeChooesefile = function() {
      return __async(this, null, function* () {
        _uploadObj.setConfig({ maxFile: props.maxFile - _uploadObj.filelist.length });
        if (typeof props.beforeChooese === "function") {
          let p = yield props.beforeChooese();
          if (typeof p === "function") {
            p = yield p();
          }
          if (!p)
            return false;
        }
        return true;
      });
    };
    _uploadObj.chooesefileAfter = function(filelist) {
      return __async(this, null, function* () {
        let tep = common_vendor.index.$tm.u.deepClone(filelist);
        if (typeof props.chooesefileAfter === "function") {
          let p = yield props.chooesefileAfter(tep);
          if (typeof p === "function") {
            p = yield p(tep);
          }
          return p;
        }
        return tep;
      });
    };
    _uploadObj.beforeSuccess = function(item) {
      return __async(this, null, function* () {
        if (typeof props.onSuccessAfter === "function") {
          let p = yield props.onSuccessAfter(item);
          if (typeof p === "function") {
            p = yield p(item);
          }
          if (!p)
            return false;
        }
        return true;
      });
    };
    _uploadObj.beforeStart = function(item) {
      return __async(this, null, function* () {
        if (typeof props.onStart === "function") {
          let p = yield props.onStart(item);
          if (typeof p === "function") {
            p = yield p(item);
          }
          if (!p)
            return false;
        }
        return true;
      });
    };
    _uploadObj.complete = function(item) {
      _flist.value = [..._uploadObj.filelist];
    };
    common_vendor.watch(
      () => props.modelValue,
      () => {
        clearTimeout(timeId);
        let pl = common_vendor.isProxy(props.modelValue) ? common_vendor.toRaw(props.modelValue) : props.modelValue;
        timeId = setTimeout(function() {
          let fl = Array.isArray(pl) ? pl : [];
          _uploadObj.clear();
          if (fl.length == 0) {
            _uploadObj.filelist = [];
            _flist.value = [];
          } else {
            let nf = addSuccess(fl);
            _uploadObj.addFile(nf);
            let nsf = common_vendor.index.$tm.u.deepClone(_uploadObj.filelist);
            _flist.value = [...nsf];
          }
        }, 100);
      },
      { deep: true }
    );
    _uploadObj.uploadComplete = function(filelist) {
      emits("uploadComplete", filelist);
      emits("update:modelValue", _uploadObj.filelist);
    };
    _uploadObj.success = function(item, fileList) {
      let files = common_vendor.index.$tm.u.deepClone(_uploadObj.filelist);
      emits("success", common_vendor.toRaw(item), files);
      emits("change", files);
    };
    _uploadObj.fail = function(item) {
      let files = common_vendor.index.$tm.u.deepClone(_uploadObj.filelist);
      emits("fail", common_vendor.toRaw(item), files);
      emits("change", files);
    };
    function chooseFile() {
      if (_disabled.value)
        return;
      _uploadObj.chooesefile().then((fileList) => {
        _flist.value = [..._uploadObj.filelist];
        emits("update:modelValue", _uploadObj.filelist);
      });
    }
    _uploadObj.progress = function(item, index) {
      _flist.value[index].status = item.progress + "% " + item.status;
      _flist.value[index].statusCode = item.statusCode;
    };
    function deletedFile(item) {
      return __async(this, null, function* () {
        if (item.statusCode == 1) {
          common_vendor.index.showToast({
            title: "上传中不允许删除",
            icon: "none",
            mask: true
          });
          return;
        }
        if (typeof props.onRemove === "function") {
          let p = yield props.onRemove(item);
          if (typeof p === "function") {
            p = yield p(item);
          }
          if (!p)
            return false;
        }
        _uploadObj.delete(item);
        _flist.value = [..._uploadObj.filelist];
        emits("remove", common_vendor.toRaw(item));
        emits("update:modelValue", _uploadObj.filelist);
        emits("change", common_vendor.toRaw(_uploadObj.filelist));
      });
    }
    function clear() {
      _uploadObj.clear();
      _uploadObj.filelist = [];
      _flist.value = [];
      emits("update:modelValue", []);
    }
    function del(fileId) {
      let index = _uploadObj.filelist.findIndex((el) => el.uid == fileId);
      if (index > -1) {
        const item = _uploadObj.filelist[index];
        if (item.statusCode == 1) {
          common_vendor.index.showToast({
            title: "上传中不允许删除",
            icon: "none",
            mask: true
          });
          return;
        }
        _uploadObj.delete(item);
        _flist.value = _flist.value.splice(index, 1);
        emits("remove", common_vendor.toRaw(item));
        emits("update:modelValue", _uploadObj.filelist);
        emits("change", common_vendor.toRaw(_uploadObj.filelist));
      }
    }
    function getFailList() {
      return _uploadObj.filelist.filter((el) => el.statusCode != tmui_components_tmUpload_upload.statusCode.fail && el.statusCode != tmui_components_tmUpload_upload.statusCode.max);
    }
    function clearFail() {
      const list = _uploadObj.filelist.filter((el) => el.statusCode != tmui_components_tmUpload_upload.statusCode.fail && el.statusCode != tmui_components_tmUpload_upload.statusCode.max);
      _flist.value = [...list];
      emits("update:modelValue", _uploadObj.filelist);
    }
    expose({
      start: () => {
        return _uploadObj.start();
      },
      stop: () => {
        return _uploadObj.stop();
      },
      clear,
      del,
      getFailList,
      clearFail
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(_flist.value, (item, index, i0) => {
          return common_vendor.e(!common_vendor.unref(_disabled) && props.showStatus ? common_vendor.e({
            a: item.statusCode == 0 || item.statusCode == 1
          }, item.statusCode == 0 || item.statusCode == 1 ? {
            b: "943ed194-2-" + i0 + "," + ("943ed194-1-" + i0),
            c: common_vendor.p({
              ["font-size"]: 23,
              color: "grey-3",
              name: "tmicon-clock-fill"
            })
          } : {}, {
            d: item.statusCode == 0 || item.statusCode == 1
          }, item.statusCode == 0 || item.statusCode == 1 ? {
            e: "943ed194-3-" + i0 + "," + ("943ed194-1-" + i0),
            f: common_vendor.p({
              color: "grey-3",
              _class: "pl-5",
              ["font-size"]: 23,
              label: item.status
            })
          } : {}, {
            g: item.statusCode == 2 || item.statusCode == 4
          }, item.statusCode == 2 || item.statusCode == 4 ? {
            h: "943ed194-4-" + i0 + "," + ("943ed194-1-" + i0),
            i: common_vendor.p({
              ["font-size"]: 23,
              color: "red",
              name: "tmicon-times-circle-fill"
            })
          } : {}, {
            j: item.statusCode == 2 || item.statusCode == 4
          }, item.statusCode == 2 || item.statusCode == 4 ? {
            k: "943ed194-5-" + i0 + "," + ("943ed194-1-" + i0),
            l: common_vendor.p({
              color: "red",
              _class: "pl-5",
              ["font-size"]: 23,
              label: item.status
            })
          } : {}, {
            m: item.statusCode == 3
          }, item.statusCode == 3 ? {
            n: "943ed194-6-" + i0 + "," + ("943ed194-1-" + i0),
            o: common_vendor.p({
              ["font-size"]: 23,
              color: "green",
              name: "tmicon-check-circle-fill"
            })
          } : {}, {
            p: item.statusCode == 3
          }, item.statusCode == 3 ? {
            q: "943ed194-7-" + i0 + "," + ("943ed194-1-" + i0),
            r: common_vendor.p({
              color: "green",
              _class: "pl-5",
              ["font-size"]: 23,
              label: item.status
            })
          } : {}, {
            s: common_vendor.unref(itemWidth) - 10 + "rpx",
            t: common_vendor.n(`round-b-${2}`)
          }) : {}, props.showSort ? {
            v: "943ed194-8-" + i0 + "," + ("943ed194-1-" + i0),
            w: common_vendor.p({
              userInteractionEnabled: false,
              color: "white",
              ["font-size"]: 22,
              name: "tmicon-angle-left"
            }),
            x: common_vendor.o(($event) => prevSort(item, index, "prev"), index),
            y: common_vendor.n(index == 0 ? "opacity-0" : ""),
            z: "943ed194-9-" + i0 + "," + ("943ed194-1-" + i0),
            A: common_vendor.p({
              userInteractionEnabled: false,
              color: "white",
              ["font-size"]: 22,
              name: "tmicon-angle-right"
            }),
            B: common_vendor.o(($event) => prevSort(item, index, "next"), index),
            C: common_vendor.n(index == _flist.value.length - 1 ? "opacity-0" : ""),
            D: common_vendor.unref(itemWidth) - 10 + "rpx",
            E: "44rpx",
            F: (common_vendor.unref(itemHeight) - 44) / 2 + "rpx"
          } : {}, {
            G: common_vendor.o(($event) => deletedFile(item), index),
            H: "943ed194-1-" + i0 + "," + ("943ed194-0-" + i0),
            I: common_vendor.p({
              preview: true,
              round: 2,
              allowDelete: false,
              extra: true,
              delete: !common_vendor.unref(_disabled),
              src: item.url,
              width: common_vendor.unref(itemWidth) - 10,
              extraPosition: "in",
              height: common_vendor.unref(itemHeight) - 10,
              model: props.imageModel
            }),
            J: "943ed194-0-" + i0,
            K: index
          });
        }),
        b: !common_vendor.unref(_disabled) && props.showStatus,
        c: props.showSort,
        d: common_vendor.p({
          round: 2,
          color: props.color,
          text: true,
          transprent: true,
          padding: [0, 0],
          margin: [0, 0]
        }),
        e: common_vendor.unref(itemWidth) - 10 + "rpx",
        f: !common_vendor.unref(_disabledAdd)
      }, !common_vendor.unref(_disabledAdd) ? {
        g: common_vendor.p({
          ["font-size"]: 42,
          userInteractionEnabled: false,
          name: "tmicon-plus"
        }),
        h: common_vendor.p({
          eventPenetrationEnabled: true,
          followTheme: props.followTheme,
          round: 2,
          color: props.color,
          text: true,
          padding: [0, 0],
          margin: [0, 0],
          _class: "flex-center",
          height: common_vendor.unref(itemHeight) - 10
        }),
        i: common_vendor.o(chooseFile),
        j: common_vendor.unref(itemWidth) - 10 + "rpx"
      } : {}, {
        k: __props.width + "rpx"
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/work/daijia_work/web/mp-weixin-driver/src/tmui/components/tm-upload/tm-upload.vue"]]);
wx.createComponent(Component);
