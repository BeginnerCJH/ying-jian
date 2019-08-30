// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: "https://static.sesine.com/wechat-weapp-movie/images/user_bg_1.jpg",
    title: '公路',
    isAuthorization: true,
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          that.setData({
            isAuthorization: false
          })
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
              //用户已经授权过
              that.setData({
                userInfo: res.userInfo
              })
              app.globalData.userInfo = res.userInfo
            }
          })
        } else {
          that.setData({
            isAuthorization: true
          })
        }
      }
    })
    // 查看是否有缓存
    if (wx.getStorageSync('skins')) {
      let obj = JSON.parse(wx.getStorageSync('skins'))
      this.setData({
        background: obj.bgUrl,
        title: obj.title
      })
    }
  },
  // 换肤
  skinPeeler(e) {
    let title = e.currentTarget.dataset.title
    let obj = {
      title: title,
      bgUrl: this.data.background
    }
    wx.setStorageSync('skins', JSON.stringify(obj))
    wx.navigateTo({
      url: '/pages/skinPeeler/skinPeeler',
    })
  },
  // 获取用户信息
  bindGetUserInfo(e) {
    console.log(e)
    if (e.detail.userInfo) {
      this.setData({
        userInfo: e.detail.userInfo,
        isAuthorization: false
      })
      app.globalData.userInfo = e.detail.userInfo
    } else {
      this.setData({
        isAuthorization: true
      })
    }
  },
  // 点击提示
  yao(e) {
    wx.showToast({
      title: '功能暂未开放',
      icon: 'none',
      duration: 2000
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
    // 查看是否有缓存
    if (wx.getStorageSync('skins')) {
      let obj = JSON.parse(wx.getStorageSync('skins'))
      this.setData({
        background: obj.bgUrl,
        title: obj.title
      })
    }
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