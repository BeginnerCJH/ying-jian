// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  // tab栏点击事件
  clickTab(e) {
    console.log(e.currentTarget.dataset.index)
    if (this.data.currentIndex == e.currentTarget.dataset.index) {
      return false;
    } else {
      this.setData({
        currentIndex: e.currentTarget.dataset.index
      })
    }
  },
  // tab主要内容滑动事件
  changeTabCon(e) {
    console.log(e.detail.current)
    this.setData({
      currentIndex: e.detail.current
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