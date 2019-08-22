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
    total:0,
    count:0,
    bannerList:[],
    indicatorDots: true,
    autoplay: true,
    circular:true,
    interval: 5000,
    duration: 1000,
    filmSubjects:[],
    hasMore:true
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
    var obj = {
      url: api.apiList.popular,
      data: {
        city: api.city,
        start: this.data.start,
        count: api.count
      }
    }
    http.request(obj).then(res => {
      this.data.count+=res.count
      this.data.filmSubjects.push(...res.subjects)
      this.setData({ filmSubjects: this.data.filmSubjects, count: this.data.count, total: res.total })
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  // 点击跳转电影详情
  viewDetails(e){
    console.log('我是详情')
    wx.navigateTo({
      url: '/pages/filmDetails/filmDetails',
    })
  },
  // 点击标签
  findTag(e){
    console.log('我是标签')
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
    this.setData({ start: 0, hasMore: true })
    var obj = {
      url: api.apiList.popular,
      data: {
        city: api.city,
        start: this.data.start,
        count: api.count
      }
    }
    http.request(obj).then(res => {
      this.setData({ filmSubjects: res.subjects, count: res.count, total: res.total })
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("触底了吗")
    let that = this
    if(this.data.count>=this.data.total){
      this.setData({ hasMore: false })
      return false
    }else{
      this.data.start=this.data.count
      this.setData({ start: this.data.start, hasMore: true })
      this.getHotShowing();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})