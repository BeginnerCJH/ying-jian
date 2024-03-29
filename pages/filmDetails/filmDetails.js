// pages/filmDetails/filmDetails.js
const api = require("../../api/api_config.js")
const http = require("../../utils/http.js")
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filmContent: {},
    isEmpty: true,
    isNnfold: false,
    isCollect: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    let id = options.id
    this.getFilmDetails(id)
  },
  // 获取电影详情
  getFilmDetails(id) {
    var obj = {
      url: api.apiList.filmDetail + id,
    }
    http.request(obj).then(res => {
      console.log(res)
      this.setData({
        filmContent: res,
        isEmpty: false
      })
      wx.setNavigationBarTitle({
        title: res.title
      })
      // 判断是否已经收藏
      this.hasCollect()
      let arr = []
      if (wx.getStorageSync('browseFilm')) {
        arr = JSON.parse(wx.getStorageSync('browseFilm'))
      } else {
        arr = []
      }
      let obj = {
        time: util.formatTime(new Date),
        data: res
      }
      // 
      let falg = arr.some(val => {
        return res.id == val.data.id;
      })
      let index = arr.findIndex(val => {
        return res.id == val.data.id;
      })
      if (!falg) {
        arr.unshift(obj)
      } else {
        arr.splice(index, 1)
        arr.unshift(obj)
      }
      wx.setStorageSync('browseFilm', JSON.stringify(arr))
      console.log(JSON.parse(wx.getStorageSync('browseFilm')))

    }).catch(err => {
      console.log(err)
    })
  },
  // 判断是否已经收藏
  hasCollect() {
    if (wx.getStorageSync('collectFilm')) {
      let arr = JSON.parse(wx.getStorageSync('collectFilm'))
      for (let i = 0; i < arr.length; i++) {
        let val = arr[i]
        if (this.data.filmContent.id == val.id) {
          this.setData({
            isCollect: true
          })
          break;
        }
      }
    }
  },
  // 点击加入收藏
  handleCollect(e) {
    console.log(123);
    this.data.isCollect = !this.data.isCollect
    this.setData({
      isCollect: this.data.isCollect
    })
    let arr = []
    if (wx.getStorageSync('collectFilm')) {
      arr = JSON.parse(wx.getStorageSync('collectFilm'))
    } else {
      arr = []
    }
    let index = arr.findIndex(val => {
      return this.data.filmContent.id == val.id;
    })

    if (this.data.isCollect) {
      arr.unshift(this.data.filmContent)
    } else {
      arr.splice(index, 1)
    }
    wx.setStorageSync('collectFilm', JSON.stringify(arr))
    console.log(JSON.parse(wx.getStorageSync('collectFilm')))

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
    this.data.filmContent.photos.forEach(val => {
      urlObj.push(val.image)
    })
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: urlObj // 需要预览的图片http链接列表
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