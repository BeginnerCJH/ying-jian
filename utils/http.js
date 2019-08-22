function request({
  url,
  data = {},
  method = 'GET',
  header = {"Content-Type": "application/json,application/json"},
  dataType ='json',
  responseType ='text'
}) {
  return new Promise((resolve, reject) => {
    _request(url, resolve, reject, data, method, header, dataType, responseType)
  })
}

function _request(url, resolve, reject, data, method, header, dataType,responseType) {
  wx.showToast({
    title: '数据加载中',
    icon: 'loading',
    duration:2000,
    mask: true
  })
  wx.showNavigationBarLoading()
  wx.request({
    url: url,
    data: data,
    header: header,
    method: method,
    dataType: dataType,
    responseType: responseType,
    success: function(res) {
      resolve(res.data)
    },
    fail: function(err) {
      reject()
    },
    complete: function(res) {
      wx.hideToast()
      wx.hideNavigationBarLoading()
    },
  })
}


module.exports = {
  request: request
}