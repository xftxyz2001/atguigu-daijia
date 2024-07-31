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
const api_user_index = require("../../api/user/index.js");
require("../../http/index.js");
require("../../http/type.js");
require("../../utils/storage.js");
require("../../config/constant.js");
require("../../store/modules/user.js");
if (!Array) {
  const _easycom_tm_icon2 = common_vendor.resolveComponent("tm-icon");
  const _easycom_tm_button2 = common_vendor.resolveComponent("tm-button");
  const _easycom_tm_sheet2 = common_vendor.resolveComponent("tm-sheet");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_icon2 + _easycom_tm_button2 + _easycom_tm_sheet2 + _easycom_tm_app2)();
}
const _easycom_tm_icon = () => "../../tmui/components/tm-icon/tm-icon.js";
const _easycom_tm_button = () => "../../tmui/components/tm-button/tm-button.js";
const _easycom_tm_sheet = () => "../../tmui/components/tm-sheet/tm-sheet.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_tm_icon + _easycom_tm_button + _easycom_tm_sheet + _easycom_tm_app)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "facialIdentification",
  props: {
    creatFaceModel: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    function imageToBase64() {
      common_vendor.index.chooseImage({
        count: 1,
        // 设置上传图片数量
        sizeType: ["original", "compressed"],
        // ['original', 'compressed']可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"],
        // ['album', 'camera'] album 从相册选图，camera 使用相机，默认二者都有
        success: (chooseImageRes) => {
          console.log("chooseImageRes", chooseImageRes);
          const tempFilePaths = chooseImageRes.tempFilePaths;
          common_vendor.index.compressImage({
            src: tempFilePaths[0],
            quality: 10,
            //图片压缩质量，0～100，默认80，仅对jpg有效
            success: (res) => {
              console.log("res", res);
              common_vendor.index.getFileSystemManager().readFile({
                filePath: res.tempFilePath,
                // 要读取的文件的临时路径
                encoding: "base64",
                // 编码格式
                success: function(res2) {
                  return __async(this, null, function* () {
                    props.creatFaceModel ? yield api_user_index.creatDriverFaceModel({ imageBase64: "data:image/png;base64," + res2.data }) : yield api_user_index.verifyDriverFace({ imageBase64: "data:image/png;base64," + res2.data });
                    common_vendor.index.navigateTo({
                      url: "/pages/index/index",
                      fail() {
                        common_vendor.index.switchTab({
                          url: "/pages/index/index"
                        });
                      }
                    });
                  });
                }
              });
            }
          });
        }
      });
    }
    common_vendor.onLoad(() => {
      console.log("onLoad-props", props);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["font-size"]: 500,
          name: " tmicon-wind-smile"
        }),
        b: common_vendor.p({
          shadow: 0,
          text: true,
          label: "点击进行人脸识别",
          block: true
        }),
        c: common_vendor.o(imageToBase64),
        d: common_vendor.p({
          round: 3,
          shadow: 2
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/work/daijia_work/web/mp-weixin-driver/src/pages/facialIdentification/facialIdentification.vue"]]);
wx.createPage(MiniProgramPage);
