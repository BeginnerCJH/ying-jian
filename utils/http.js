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
    complete: function(res) {},
  })
}


module.exports = {
  request: request
}