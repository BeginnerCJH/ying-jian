// pages/personDetail/personDetail.js
const api = require("../../api/api_config.js")
const http = require("../../utils/http.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personDetail: {},
    isEmpty: true,
    isNnfold: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    const id = options.personid
    this.getPersonDetail(id)
  },
  // 获取人物详情
  getPersonDetail(id) {
    var obj = {
      url: api.apiList.personDetail + id,
    }
    http.request(obj).then(res => {
      console.log(res)
      wx.setNavigationBarTitle({
        title: res.name,
      })
      this.setData({
        personDetail: res,
        isEmpty: false
      })
    }).catch(err => {
      console.log(err)
    })
  },
  // 展开详情
  unfold() {
    this.setData({
      isNnfold: true
    })
  },
  // 剧照预览
  preview(e) {
    console.log(e.currentTarget.dataset.imgurl)
    let url = e.currentTarget.dataset.imgurl
    let urlObj = []
    this.data.personDetail.photos.forEach(val => {
      urlObj.push(val.image)
    })
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: urlObj // 需要预览的图片http链接列表
    })
  },

  // 查看电影详情
  viewDetails(e) {
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/filmDetails/filmDetails?id=${id}`,
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