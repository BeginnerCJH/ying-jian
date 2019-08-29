// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabTitle: ['电影', '人物'],
    tipF: {
      tipTitle: '亲，找不到电影收藏记录',
      tipBtn: '去逛逛',
      url: "/pages/popular/popular"
    },
    tipP: {
      tipTitle: '亲，找不到人物收藏记录',
      tipBtn: '去逛逛',
      url: "/pages/popular/popular"
    },
    flimCollectArr: [],
    isEmptyF: true,
    personCollectArr: [],
    isEmptyP: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getFileCollect()
    this.getPersonCollect()
  },
  // 获取电影浏览记录
  getFileCollect() {
    if (wx.getStorageSync('collectFilm') && wx.getStorageSync('collectFilm')!="[]") {
      let arr = JSON.parse(wx.getStorageSync('collectFilm'))
      this.setData({
        flimCollectArr: arr,
        isEmptyF: false
      })
    } else {
      this.setData({
        flimCollectArr: [],
        isEmptyF: true
      })
    }
    console.log(this.data.flimCollectArr)
  },
  // 获取人物浏览记录
  getPersonCollect() {
    if (wx.getStorageSync('collectPerson') && wx.getStorageSync('collectPerson') != "[]") {
      let arr = JSON.parse(wx.getStorageSync('collectPerson'))
      this.setData({
        personCollectArr: arr,
        isEmptyP: false
      })
    } else {
      this.setData({
        personCollectArr: [],
        isEmptyP: true
      })
    }
    console.log(this.data.personCollectArr)
  },
  // 点击跳转电影详情
  viewDetails(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/filmDetails/filmDetails?id=${id}`,
    })
  },
  // 跳转到人物详情
  goToPersonDetail(e) {
    let id = e.currentTarget.dataset.personid
    console.log(id)
    wx.navigateTo({
      url: `/pages/personDetail/personDetail?personid=${id}`,
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
    this.getFileCollect()
    this.getPersonCollect()
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