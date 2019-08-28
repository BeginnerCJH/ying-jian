// component/tab/tab.js
Component({
  //下面是组件的属性列表
  options: {
    multipleSlots: true //在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    tabTitle: {
      type: Array,
      value: ['a', 'b']
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // tab栏点击事件
    clickTab(e) {
      if (this.data.currentIndex == e.currentTarget.dataset.index) {
        return false;
      } else {
        this.setData({
          currentIndex: e.currentTarget.dataset.index, currentTitle: e.currentTarget.dataset.title
        })
      }
      this.aa()
    },
    // tab主要内容滑动事件
    changeTabCon(e) {
      console.log(e)
      this.setData({
        currentIndex: e.detail.current,
        currentTitle: e.target.dataset.title
      })
      this.aa()
    },

    // 暴露外包的方法
    aa(){
      console.log('123')
      return this.data.currentTitle
    }
  }
})