let common = {}
//四个角弹框 右上角top-right 右下角bottom-right  左上角top-left 左下角bottom-left
// type 成功success 警告warning 错误error 消息info
// msg提示的内容
common.notify = (obj, msg, type = 'success', location = 'bottom-right') => {
  obj.$notify({
    title: msg,
    message: msg,
    position: location,
    type: type,
  })
}
//成功失败警告提示框 type 成功success 警告warning 错误error 消息info msg提示的内容
common.message = (obj, msg, type = 'success') => {
  obj.$message({
    message: msg,
    type: type,
  })
}
//把1和0转成是否
common.change = (num) => {
  return num.toString() === '1' ? '是' : '否'
}
common.mSuccess = (obj, msg) => {
  obj.$message({
    message: msg,
    type: 'success',
  })
}
common.mWarning = (obj, msg) => {
  obj.$message({
    message: msg,
    type: 'warning',
  })
}
common.mError = (obj, msg) => {
  obj.$message({
    message: msg,
    type: 'error',
  })
}
common.mInfo = (obj, msg) => {
  obj.$message({
    message: msg,
    type: 'info',
  })
}
//确认提示框 type 成功success 警告warning 错误error 消息info  msg提示的内容
common.confirm = (obj, msg, type = 'warning') => {
  return new Promise((resolve, reject) => {
    obj
      .$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: type,
      })
      .then(() => {
        resolve('ok')
        return
      })
      .catch(() => {
        reject('cannel')
        return
      })
  })
}
// loading
common.loading = false
//loading 开启
common.open = (obj, item) => {
  common.loading = obj.$loading({
    lock: true,
    text: item.text == undefined ? 'Loading' : item.text,
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
}
//loading 关闭
common.close = () => {
  common.loading.close()
}
// 时间日期转换

/**
 * 类似 2018-05-19T08:04:52.000+0000 格式的时间转换
 *
 * @type {Date}
 */
common.formatDateTime = function(datetime, format) {
  let d = new Date(datetime)
  let formateArr = ['Y', 'M', 'D', 'h', 'm', 's']
  let datetimeParts = [] //日期分片数组
  let result = format

  let Y = d.getFullYear()
  let M = d.getMonth() + 1
  let D = d.getDate()
  let h = d.getHours()
  let m = d.getMinutes()
  let s = d.getSeconds()

  datetimeParts.push(Y)
  datetimeParts.push(M)
  datetimeParts.push(D)
  datetimeParts.push(h)
  datetimeParts.push(m)
  datetimeParts.push(s)

  for (let i = 0; i < formateArr.length; i++) {
    result = result.replace(formateArr[i], datetimeParts[i])
  }
  return result
}
// 计算padding跟margin的值
common.getPadding = (obj, item) => {
  if (obj.currentStyle) {
    return parseInt(obj.currentStyle[item])
  } else {
    return parseInt(document.defaultView.getComputedStyle(obj, null)[item])
  }
}
//计算echars的高度
common.getHeightData = () => {
  let v_height =
    document.documentElement.clientHeight || document.body.clientHeight
  let v_footer = document.querySelector('#footer').offsetHeight
  let v_header = document.querySelector('#header').offsetHeight
  let v_search = document.querySelector('.search').offsetHeight
  let v_body = document.querySelector('.body-title').offsetHeight
  let page_paddingTop = document.querySelector('.page')
  let page_containerTop = document.querySelector('.container')
  let body_title = document.querySelector('.body-title')
  let page_num = common.getPadding(page_paddingTop, 'paddingTop')
  let page_container = common.getPadding(page_containerTop, 'paddingTop')
  let body_title_margin = common.getPadding(body_title, 'marginBottom')
  document.querySelector('.container').style.height =
    v_height -
    v_search -
    v_body -
    v_header -
    v_footer -
    page_container -
    page_num -
    body_title_margin +
    'px'
}
// 获取底部文字位置
common.handleFooter = () => {
  let v_height = document.querySelector('#header').offsetHeight
  let v_foot = document.querySelector('#footer').offsetHeight
  let titleHeight = document.querySelector('.system').offsetHeight
  let page_paddingTop = document.querySelector('.page')
  let page_num = 0
  let butHeight = document.querySelector('.collapse-btn').offsetHeight
  if (page_paddingTop.currentStyle) {
    page_num = parseInt(page_paddingTop.currentStyle['paddingTop'])
  } else {
    page_num = parseInt(
      document.defaultView.getComputedStyle(page_paddingTop, null)['paddingTop']
    )
  }
  document.querySelector('#sidebar').style.height =
    (document.documentElement.clientHeight || document.body.clientHeight) -
    v_height -
    titleHeight +
    'px'
  document.querySelector('.content').style.height =
    (document.documentElement.clientHeight || document.body.clientHeight) -
    v_height +
    'px'
  document.querySelector('.page').style.minHeight =
    (document.documentElement.clientHeight || document.body.clientHeight) -
    page_num -
    v_foot -
    v_height +
    'px'
  document.querySelector('.collapse-btn').style.top =
    (document.documentElement.clientHeight || document.body.clientHeight) / 2 -
    butHeight -
    butHeight / 2 +
    'px'
}
export default common
