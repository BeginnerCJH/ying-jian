// pages/browse/browse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabTitle: ['电影', '人物'],
    tipF: {
      tipTitle: '亲，找不到电影浏览记录',
      tipBtn: '去逛逛',
      url: "/pages/popular/popular"
    },
    tipP: {
      tipTitle: '亲，找不到人物浏览记录',
      tipBtn: '去逛逛',
      url: "/pages/popular/popular"
    },
    flimBrowseArr: [],
    isEmptyF: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getFileBrowse()
  },
  // 获取电影浏览记录
  getFileBrowse() {
    if (wx.getStorageSync('browseFikn')) {
      let arr = JSON.parse(wx.getStorageSync('browseFikn'))
      this.setData({
        flimBrowseArr: arr,
        isEmptyF: false
      })
    } else {
      this.setData({
        flimBrowseArr: [],
        isEmptyF: true
      })
    }
    console.log(this.data.flimBrowseArr)
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