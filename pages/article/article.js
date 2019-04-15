Page({
  data: {
    "tkmDT": "平台动态",
    "tkmGG": "平台公告",
    "tkmZX": "行业资讯",
    "articleDTList":[],
    "articleGGList": [],
    "articleZXList": [],
    "thisItem":"1",
    jsnodata:false,
    jshavedata:false,
    articleDTpage:'1',
    articleGGpage: '1',
    articleZXpage: '1',
    DTonReachBottom: false,
    GGonReachBottom: false,
    ZXonReachBottom: false
  },
  onLoad(options){
    let that = this;
    that.articleDT();
    wx.getStorage({
      key: 'id',
      success: function (res) {
        that.setData({
          thisItem: res.data
        });
        if (res.data == 1){
          that.articleDT();
        } else if (res.data == 2){
          that.articleGG();
        } else if (res.data == 3) {
          that.articleZX();
        }
      }
    })      
  },
  tkmyxTap(e){
    this.articleDT();
    this.setData({
      thisItem: e.target.dataset.num
    })
  },
  tkmycTap(e) {
    this.articleGG();
    this.setData({
      thisItem: e.target.dataset.num
    })
  },
  tkmjsTap(e) {
    this.articleZX();
    this.setData({
      thisItem: e.target.dataset.num
    })
  },
  /***下拉刷新***/
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //console.log(this.data.thisItem);
    //模拟加载
    if (this.data.thisItem == 1) {
      this.articleDT();
    } else if (this.data.thisItem == 2) {
      this.articleGG();
    } else if (this.data.thisItem == 3) {
      this.articleZX();
    }
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  //上拉加载更多
  onReachBottom() {   
    wx.showNavigationBarLoading() //在标题栏中显示加载
    if (this.data.thisItem == 1) {
      this.articleDTupdateMore();
    } else if (this.data.thisItem == 2) {
      this.articleGGupdateMore();
    } else if (this.data.thisItem == 3) {
      this.articleZXupdateMore();
    }
    wx.hideNavigationBarLoading() //完成停止加载
  },  
  //点击进入详情页面
  toDetail(e){
    var articleId = e.currentTarget.dataset.articleid
    wx.navigateTo({
      url: "/pages/articleDetail/articleDetail?articleId=" + articleId
    })
  },
  //平台动态数据加载
  articleDT() {
    let that = this;
    that.articleDTList = [];
    //数据加载
    wx.showLoading({
      title: "玩命加载中...",
      icon: "loading"
    }),
    wx.request({
      url: 'https://www.taikongma.com/mobile/app/memberCenter/informationPage?pageNumber=1&pageSize=10&articleType=LATEST_ACTIVITY&_APP_VERSION_CODE=10.10.10.10&_DEVICE_IDENTIFIER=IOS-WECHAT-MINI', //接口地址
        method: 'POST',
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            articleDTList: res.data.data.articleVoList,
          });
          wx.hideLoading();   
        },
        fail: function (err) {},//请求失败
        complete: function () {}//请求完成后执行的函数
      });
    
  },
  //平台动态加载更多
  articleDTupdateMore(){
    var that = this;
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中...',
      icon: "loading"
    })
    that.data.articleDTpage++
    wx.request({
      url: 'https://www.taikongma.com/mobile/app/memberCenter/informationPage?pageNumber=' + that.data.articleDTpage + '&pageSize=10&articleType=LATEST_ACTIVITY&_APP_VERSION_CODE=10.10.10.10&_DEVICE_IDENTIFIER=IOS-WECHAT-MINI',
      method: "POST",
      // 请求头部  
      header: { 'content-type': 'application/json' },
      success: function (res) {
        var thisList = that.data.articleDTList;
        if (res.data.data.articleVoList.length == 0) {
          that.setData({
            DTonReachBottom: true
          });
        };
        for (var i = 0; i < res.data.data.articleVoList.length; i++){
          thisList.push(res.data.data.articleVoList[i]);
        };
        // 设置数据  
        that.setData({
          articleDTList: that.data.articleDTList
        })
        // 隐藏加载框
        wx.hideLoading();
      }
    })
  },

  //平台公告数据加载
  articleGG() {
    let that = this;
    that.articleGGList = [];
    //数据加载
    wx.showLoading({
      title: "玩命加载中...",
      icon: "loading"
    }),
      wx.request({
      url: 'https://www.taikongma.com/mobile/app/memberCenter/informationPage?pageNumber=1&pageSize=10&articleType=PLATFORM_NOTICE&_APP_VERSION_CODE=10.10.10.10&_DEVICE_IDENTIFIER=IOS-WECHAT-MINI', //接口地址
        method: 'POST',
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            articleGGList: res.data.data.articleVoList,
          });
          wx.hideLoading();
        },
        fail: function (err) { },//请求失败
        complete: function () { }//请求完成后执行的函数
      });

  },
  //平台动态加载更多
  articleGGupdateMore() {
    var that = this;
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中...',
      icon: "loading"
    })
    that.data.articleGGpage++
    wx.request({
      url: 'https://www.taikongma.com/mobile/app/memberCenter/informationPage?pageNumber=' + that.data.articleGGpage + '&pageSize=10&articleType=PLATFORM_NOTICE&_APP_VERSION_CODE=10.10.10.10&_DEVICE_IDENTIFIER=IOS-WECHAT-MINI',
      method: "POST",
      // 请求头部  
      header: { 'content-type': 'application/json' },
      success: function (res) {
        var thisList = that.data.articleGGList;
        if (res.data.data.articleVoList.length == 0) {
          that.setData({
            DTonReachBottom: true
          });
        };
        for (var i = 0; i < res.data.data.articleVoList.length; i++) {
          thisList.push(res.data.data.articleVoList[i]);
        };
        // 设置数据  
        that.setData({
          articleGGList: that.data.articleGGList
        })
        // 隐藏加载框
        wx.hideLoading();
      }
    })
  },

  //行业资讯数据加载
  articleZX() {
    let that = this;
    that.articleZXList = [];
    //数据加载
    wx.showLoading({
      title: "玩命加载中...",
      icon: "loading"
    }),
      wx.request({
      url: 'https://www.taikongma.com/mobile/app/memberCenter/informationPage?pageNumber=1&pageSize=10&articleType=COMPANY_NEWS&_APP_VERSION_CODE=10.10.10.10&_DEVICE_IDENTIFIER=IOS-WECHAT-MINI', //接口地址
        method: 'POST',
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            articleZXList: res.data.data.articleVoList,
          });
          wx.hideLoading();
        },
        fail: function (err) { },//请求失败
        complete: function () { }//请求完成后执行的函数
      });

  },
  //平台动态加载更多
  articleZXupdateMore() {
    var that = this;
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中...',
      icon: "loading"
    })
    that.data.articleZXpage++
    wx.request({
      url: 'https://www.taikongma.com/mobile/app/memberCenter/informationPage?pageNumber=' + that.data.articleZXpage + '&pageSize=10&articleType=COMPANY_NEWS&_APP_VERSION_CODE=10.10.10.10&_DEVICE_IDENTIFIER=IOS-WECHAT-MINI',
      method: "POST",
      // 请求头部  
      header: { 'content-type': 'application/json' },
      success: function (res) {
        var thisList = that.data.articleZXList;
        if (res.data.data.articleVoList.length == 0) {
          that.setData({
            DTonReachBottom: true
          });
        };
        for (var i = 0; i < res.data.data.articleVoList.length; i++) {
          thisList.push(res.data.data.articleVoList[i]);
        };
        // 设置数据  
        that.setData({
          articleZXList: that.data.articleZXList
        })
        // 隐藏加载框
        wx.hideLoading();
      }
    })
  },

})