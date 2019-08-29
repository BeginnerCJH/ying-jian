// pages/phoneInfo/phoneInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneInfo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this
    wx.getSystemInfo({
      success(res) {
        _this.data.phoneInfo.push({
          name: '手机品牌',
          value: res.brand
        })
        _this.data.phoneInfo.push({
          name: '手机型号',
          value: res.model
        })
        _this.data.phoneInfo.push({
          name: '分辨率',
          value: res.windowWidth + '*' + res.windowHeight
        })
        _this.data.phoneInfo.push({
          name: '系统语言',
          value: res.language
        })
        _this.data.phoneInfo.push({
          name: '微信版本',
          value: res.version
        })
        _this.data.phoneInfo.push({
          name: '小程序版本',
          value: 'v1.0.5'
        })
        _this.setData({
          phoneInfo: _this.data.phoneInfo
        })
        console.log(_this.data.phoneInfo)
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