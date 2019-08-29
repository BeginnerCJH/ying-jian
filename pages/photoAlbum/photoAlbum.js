// pages/photoAlbum/photoAlbum.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tip: {
      tipTitle: '亲，还没有上传照片哦',
      tipBtn: '去上传',
      array: ['拍照', '本地上传'],
    },
    isEmpty: true,
    photoArr: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getPhotos()
  },
  // 获取本地缓存的照片
  getPhotos() {
    var _this = this
    // 获取本地缓存的图片
    wx.getSavedFileList({
      success(res) {
        console.log(res.fileList)
       
        if (res.fileList.length > 0) {
          let arr = res.fileList.sort(util.compare('createTime'))
          arr.forEach(val => {
            _this.data.photoArr.push(val.filePath)
          })
          _this.setData({
            photoArr: _this.data.photoArr,
            isEmpty: false
          })
        } else {
          _this.setData({
            photoArr: [],
            isEmpty: true
          })
        }

      }
    })
  },
  // 提示的点击事件
  clickTip() {
    var _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        // 保存到本地
        wx.saveFile({
          tempFilePath: tempFilePaths[0],
          success(res) {
            const savedFilePath = res.savedFilePath
            _this.setData({
              photoArr: []
            })
            // 获取本地缓存的图片
            _this.getPhotos()
          }
        })
      }
    })
  },
  // 预览照片
  preview(e){
    console.log(e.currentTarget.dataset.url)
    wx.previewImage({
      current: e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: this.data.photoArr // 需要预览的图片http链接列表
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