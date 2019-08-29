// pages/personDetail/personDetail.js
const api = require("../../api/api_config.js")
const http = require("../../utils/http.js")
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personDetail: {},
    isEmpty: true,
    isNnfold: false,
    isCollect: false
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
      // 判断是否加入收藏
      this.hasCollect()
      let arr = []
      let time = util.formatTime(new Date).toString().split(" ")
      console.log(time)
      let keyTime = time[0];
      let jutiTime = time[time.length - 1]
      console.log(keyTime)
      if (wx.getStorageSync('browsePerson')) {
        arr = JSON.parse(wx.getStorageSync('browsePerson'))[keyTime]
      } else {
        arr = []
      }
      let obj = {
        time: jutiTime,
        data: res
      }
      let objK = {}
      // 遍历对象
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
      objK[keyTime] = arr
      wx.setStorageSync('browsePerson', JSON.stringify(objK))
      console.log(JSON.parse(wx.getStorageSync('browsePerson')))
    }).catch(err => {
      console.log(err)
    })
  },
  // 判断是否已经收藏
  hasCollect() {
    if (wx.getStorageSync('collectPerson')) {
      let arr = JSON.parse(wx.getStorageSync('collectPerson'))
      for (let i = 0; i < arr.length; i++) {
        let val = arr[i]
        if (this.data.personDetail.id == val.id) {
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
    if (wx.getStorageSync('collectPerson')) {
      arr = JSON.parse(wx.getStorageSync('collectPerson'))
    } else {
      arr = []
    }
    let index = arr.findIndex(val => {
      return this.data.personDetail.id == val.id;
    })

    if (this.data.isCollect) {
      arr.unshift(this.data.personDetail)
    } else {
      arr.splice(index, 1)
    }
    wx.setStorageSync('collectPerson', JSON.stringify(arr))
    console.log(JSON.parse(wx.getStorageSync('collectPerson')))

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