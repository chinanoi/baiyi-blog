"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var common = {}; //四个角弹框 右上角top-right 右下角bottom-right  左上角top-left 左下角bottom-left
// type 成功success 警告warning 错误error 消息info
// msg提示的内容

common.notify = function (obj, msg) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'success';
  var location = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'bottom-right';
  obj.$notify({
    title: msg,
    message: msg,
    position: location,
    type: type
  });
}; //成功失败警告提示框 type 成功success 警告warning 错误error 消息info msg提示的内容


common.message = function (obj, msg) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'success';
  obj.$message({
    message: msg,
    type: type
  });
}; //把1和0转成是否


common.change = function (num) {
  return num.toString() === '1' ? '是' : '否';
};

common.mSuccess = function (obj, msg) {
  obj.$message({
    message: msg,
    type: 'success'
  });
};

common.mWarning = function (obj, msg) {
  obj.$message({
    message: msg,
    type: 'warning'
  });
};

common.mError = function (obj, msg) {
  obj.$message({
    message: msg,
    type: 'error'
  });
};

common.mInfo = function (obj, msg) {
  obj.$message({
    message: msg,
    type: 'info'
  });
}; //确认提示框 type 成功success 警告warning 错误error 消息info  msg提示的内容


common.confirm = function (obj, msg) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'warning';
  return new Promise(function (resolve, reject) {
    obj.$confirm(msg, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: type
    }).then(function () {
      resolve('ok');
      return;
    })["catch"](function () {
      reject('cannel');
      return;
    });
  });
}; // loading


common.loading = false; //loading 开启

common.open = function (obj, item) {
  common.loading = obj.$loading({
    lock: true,
    text: item.text == undefined ? 'Loading' : item.text,
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
}; //loading 关闭


common.close = function () {
  common.loading.close();
}; // 时间日期转换

/**
 * 类似 2018-05-19T08:04:52.000+0000 格式的时间转换
 *
 * @type {Date}
 */


common.formatDateTime = function (datetime, format) {
  var d = new Date(datetime);
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var datetimeParts = []; //日期分片数组

  var result = format;
  var Y = d.getFullYear();
  var M = d.getMonth() + 1;
  var D = d.getDate();
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  datetimeParts.push(Y);
  datetimeParts.push(M);
  datetimeParts.push(D);
  datetimeParts.push(h);
  datetimeParts.push(m);
  datetimeParts.push(s);

  for (var i = 0; i < formateArr.length; i++) {
    result = result.replace(formateArr[i], datetimeParts[i]);
  }

  return result;
}; // 计算padding跟margin的值


common.getPadding = function (obj, item) {
  if (obj.currentStyle) {
    return parseInt(obj.currentStyle[item]);
  } else {
    return parseInt(document.defaultView.getComputedStyle(obj, null)[item]);
  }
}; //计算echars的高度


common.getHeightData = function () {
  var v_height = document.documentElement.clientHeight || document.body.clientHeight;
  var v_footer = document.querySelector('#footer').offsetHeight;
  var v_header = document.querySelector('#header').offsetHeight;
  var v_search = document.querySelector('.search').offsetHeight;
  var v_body = document.querySelector('.body-title').offsetHeight;
  var page_paddingTop = document.querySelector('.page');
  var page_containerTop = document.querySelector('.container');
  var body_title = document.querySelector('.body-title');
  var page_num = common.getPadding(page_paddingTop, 'paddingTop');
  var page_container = common.getPadding(page_containerTop, 'paddingTop');
  var body_title_margin = common.getPadding(body_title, 'marginBottom');
  document.querySelector('.container').style.height = v_height - v_search - v_body - v_header - v_footer - page_container - page_num - body_title_margin + 'px';
}; // 获取底部文字位置


common.handleFooter = function () {
  var v_height = document.querySelector('#header').offsetHeight;
  var v_foot = document.querySelector('#footer').offsetHeight;
  var titleHeight = document.querySelector('.system').offsetHeight;
  var page_paddingTop = document.querySelector('.page');
  var page_num = 0;
  var butHeight = document.querySelector('.collapse-btn').offsetHeight;

  if (page_paddingTop.currentStyle) {
    page_num = parseInt(page_paddingTop.currentStyle['paddingTop']);
  } else {
    page_num = parseInt(document.defaultView.getComputedStyle(page_paddingTop, null)['paddingTop']);
  }

  document.querySelector('#sidebar').style.height = (document.documentElement.clientHeight || document.body.clientHeight) - v_height - titleHeight + 'px';
  document.querySelector('.content').style.height = (document.documentElement.clientHeight || document.body.clientHeight) - v_height + 'px';
  document.querySelector('.page').style.minHeight = (document.documentElement.clientHeight || document.body.clientHeight) - page_num - v_foot - v_height + 'px';
  document.querySelector('.collapse-btn').style.top = (document.documentElement.clientHeight || document.body.clientHeight) / 2 - butHeight - butHeight / 2 + 'px';
};

var _default = common;
exports["default"] = _default;