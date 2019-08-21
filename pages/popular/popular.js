// pages/popular/popular.js
const api = require("../../api/api_config.js")
const http = require("../../utils/http.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: 0,
    bannerList:[],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    this.setData({ bannerList: api.bannerList})
    wx.showNavigationBarLoading()
    app.getCity(function() {
      wx.hideNavigationBarLoading()
      wx.setNavigationBarTitle({
        title: '正在热映 - ' + api.city
      })
      that.getHotShowing()
    })
  },

  // 获取热映电影
  getHotShowing() {
    wx.showNavigationBarLoading()
    http.request({
      url: api.apiList.popular,
      data: {
        city: api.city,
        start: this.data.start,
        count: api.count
      }
    }).then(res => {
      wx.hideNavigationBarLoading()
      console.log(res)
    }).catch(err => {
      wx.hideNavigationBarLoading()
      console.log(err)
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