// pages/updateLocation/updateLocation.js
const api = require("../../api/api_config.js")
const http = require("../../utils/http.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: '',
    latitude: '',
    markers: [{
      iconPath: "/images/dingwei.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50,
      callout: {
        content: '广州',
        fontSize: 12,
        color: '#54c180',
        padding: 10,
        borderRadius: 6,
        display: 'ALWAYS'
      },
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCurrentLocation()
  },
  // 获取当前位置
  getCurrentLocation() {
    var _this = this
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        console.log(res)
        let location = res.latitude + 0.001276 + ',' + res.longitude + 0.001276
        _this.setData({
          longitude: res.longitude + 0.001276,
          latitude: res.latitude + 0.001276,
        })
        http.request({
          url: api.apiList.baiduMap,
          data: {
            ak: api.baiduAK,
            location: location,
            output: 'json',
            pois: '1'
          }
        }).then(res => {
          console.log(res)
          api.city = res.result.addressComponent.city.slice(0, -1)
          console.log(api.city)
          _this.setData({
            markers: [{
              iconPath: "/images/dingwei.png",
              id: 0,
              latitude: _this.data.latitude,
              longitude: _this.data.longitude,
              width: '50rpx',
              height: '50rpx',
              callout: {
                content: res.result.formatted_address + '\n' + res.result.sematic_description,
                fontSize: 12,
                color: '#54c180',
                padding: 10,
                borderRadius: 6,
                display: 'ALWAYS'
              },
            }]
          })
        }).catch(err => {
          console.log(err)
        })


      },
    })
  },
  // 重新选择位置
  selectLocation() {
    var _this = this
    wx.chooseLocation({
      success(res) {
        console.log(res)
        _this.setData({
          longitude: res.longitude + 0.001276,
          latitude: res.latitude + 0.001276,
          markers: [{
            iconPath: "/images/dingwei.png",
            id: 0,
            latitude: res.latitude + 0.001276,
            longitude: res.longitude + 0.001276,
            width: '50rpx',
            height: '50rpx',
            callout: {
              content: res.address + '\n' + res.name,
              fontSize: 12,
              color: '#54c180',
              padding: 10,
              borderRadius: 6,
              display: 'ALWAYS'
            },
          }]
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})