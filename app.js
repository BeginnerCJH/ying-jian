//app.js
const api = require("./api/api_config.js")
const http = require("./utils/http.js")
App({
  onLaunch: function() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
      }
    })
  },
  // 获取城市
  getCity(cb) {
    var that = this
    wx.getLocation({
      success: function(res) {
        let location = res.latitude + ',' + res.longitude
        console.log(location)
        http.request({
          url: api.apiList.baiduMap,
          data:{
            ak: api.baiduAK,
            location: location,
            output: 'json',
            pois: '1'
          }
        }).then(res => {
          console.log(res)
          api.city = res.result.addressComponent.city.slice(0, -1)
          console.log(api.city)
          typeof cb == "function" && cb(res.result.addressComponent.city.slice(0, -1))

        }).catch(err => {
          console.log(err)
        })

      },
      fail:function(res){
          // 重新定位
          that.getCity();
      }
    })
  },
  globalData: {
    userInfo: null
  }
})