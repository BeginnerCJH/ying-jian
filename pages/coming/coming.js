// pages/coming/coming.js
const api = require("../../api/api_config.js")
const http = require("../../utils/http.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filmSubjects: [],
    start: 0,
    count: 0,
    total: 0,
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getComingFilm()
  },
  // 获取即将上映的电影
  getComingFilm() {
    var obj = {
      url: api.apiList.coming,
      data: {
        city: api.city,
        start: this.data.start,
        count: api.count
      }
    }
    http.request(obj).then(res => {
      console.log(res)
      this.data.filmSubjects.push(...res.subjects)
      this.data.count += res.count
      this.setData({
        filmSubjects: this.data.filmSubjects,
        count: this.data.count,
        total: res.total
      })
    }).catch(err => {
      console.log(err)
    })
  },
  // 点击跳转电影详情
  viewDetails(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/filmDetails/filmDetails?id=${id}`,
    })
  },
  // 点击标签
  findTag(e) {
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
      url: api.apiList.coming,
      data: {
        city: api.city,
        start: this.data.start,
        count: api.count
      }
    }
    http.request(obj).then(res => {
      this.setData({ filmSubjects: res.subjects, count: res.count, total: res.total })
      wx.stopPullDownRefresh()
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.count >= this.data.total) {
      this.setData({
        hasMore: false
      })
      return false;
    } else {
      this.data.start = this.data.count
      this.setData({
        start: this.data.start,
        hasMore: true
      })
      this.getComingFilm()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})