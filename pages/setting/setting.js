// pages/setting/setting.js

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  // 点击清除缓存
  clearCache() {
    wx.showModal({
      title: '确定要清除缓存',
      content: '清除缓存会删除浏览历史和收藏以及相册',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.clearStorageSync()
          wx.getSavedFileList({
            success(res) {
              if (res.fileList.length > 0) {
                res.fileList.forEach(val => {
                  wx.removeSavedFile({
                    filePath: val.filePath,
                    complete(res) {
                      console.log(res)
                    }
                  })
                })

              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
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