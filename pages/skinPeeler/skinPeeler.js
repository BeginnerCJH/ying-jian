// pages/skinPeeler/skinPeeler.js
const api = require("../../api/api_config.js")
const http = require("../../utils/http.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    skinList:[],
    title:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ skinList: api.skinList})
    // 查看是否有缓存
    if (wx.getStorageSync('skins')) {
      let obj = JSON.parse(wx.getStorageSync('skins'))
      this.setData({title: obj.title })
    }
  },
// 跳转到个人中心
  goToMine(e){
    let title = e.currentTarget.dataset.title
    let bgurl = e.currentTarget.dataset.bgurl
    console.log(e)
    let obj = {
      title: title,
      bgUrl: bgurl
    }
    wx.setStorageSync('skins', JSON.stringify(obj))
    wx.switchTab({
      url: '/pages/mine/mine',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})