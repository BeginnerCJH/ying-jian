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
    isEmptyF: true,
    personBrowseArr: [],
    isEmptyP: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getFileBrowse()
    this.getPersonBrowse()
  },
  // 获取电影浏览记录
  getFileBrowse() {
    if (wx.getStorageSync('browseFilm') && wx.getStorageSync('browseFilm') != "[]") {
      let arr = JSON.parse(wx.getStorageSync('browseFilm'))
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
  // 获取人物浏览记录
  getPersonBrowse() {
    if (wx.getStorageSync('browsePerson') && wx.getStorageSync('browsePerson') != "[]") {
      let arr = JSON.parse(wx.getStorageSync('browsePerson'))
      this.setData({
        personBrowseArr: arr,
        isEmptyP: false
      })
    } else {
      this.setData({
        personBrowseArr: [],
        isEmptyP: true
      })
    }
    console.log(this.data.personBrowseArr)
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
    this.getFileBrowse()
    this.getPersonBrowse()
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