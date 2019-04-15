/*
  *======@Description:       太空马小程序======*
  *======@Version:                v1.0.0======*
  *======@Author:                  DaXia======*
  ---------------------------------------------
  ========***=============**======**===========
  ========**=============**==************======
  ===***************====**=====**=**=**========
  ======**=**=========****=****************====
  =====**===**===========**=====**==**=========
  ====**=====***=========**====**====**========
  ===**=======****=======**==***======**=======
  ---------------------------------------------
*/
//太空马首页
Page({
  data: {
    bannerList:[],
    announcementList: [],
    indicatorDots: false, //BANNER是否显示导航圆点
    indicatorColor: 'rgba(255,255,255,.3)',//BANNER滑动圆点颜色  
    indicatorActiveColor: 'white', //BANNER当前圆点颜色  
    autoplay: true, //BANNER是否自动滑动
    circular: true, //采用衔接滑动
    interval: 5000, //BANNER自动切换时间间隔
    duration: 1000, //BANNER滑动动画时长
    _num: "0",
    packetCount: '', //小马优选
    losignCount: '', //小马有财
    transferCount: '', //小马集市
    yearRate:'',
    increasedRate: '',
    borrowDeadline: '',
    timeLimitUnit:'',
    investPercent: '',
    loanState:'',
    currentTime:'',
    endTime: '',
    clock:''
  },
  onLoad() {
    this.loadData();
  },
  loanClick(e) {
    wx.clearStorage();
    wx.switchTab({
      url: '../loan/loan',   //注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面
    });
    //缓存ID
    wx.setStorage({
      key: "id",
      data: e.currentTarget.dataset.id
    })
  },
  
  //点击进入详情页面
  toDetail(e) {
    var articleId = e.currentTarget.dataset.articleid
    wx.navigateTo({
      url: "/pages/articleDetail/articleDetail?articleId=" + articleId
    })
  },

  //事件处理-点击BANNER进入详情页面
  goToDetail(e) {
    //console.log(e.currentTarget.dataset.url)
    var url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: '../webview/webview?url=' + url
    })
  },

  loadData() {
    let that = this;
    //BANNER数据加载
    wx.request({
      url: 'https://www.taikongma.com/mobile/app/mainpage?_APP_VERSION_CODE=10.10.10.10&_DEVICE_IDENTIFIER=IOS-WECHAT-MINI', //接口地址
      method: 'POST',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          bannerList: res.data.data.bannerList,//首页BANNER
          announcementList: res.data.data.announcementList,//滚动公告
          packetCount: res.data.data.packetCount, //小马优选可投数量
          losignCount: res.data.data.losignCount, //小马有财可投数量
          transferCount: res.data.data.transferCount, //小马集市可投数量
          loanSignForNewbieList: res.data.data.loanSignForNewbieList[0],//新手标
          yearRate: returnFloat(res.data.data.loanSignForNewbieList[0].yearRate * 100),//年利率
          increasedRate: returnFloat(res.data.data.loanSignForNewbieList[0].increasedRate * 100),//加息
          borrowDeadline: res.data.data.loanSignForNewbieList[0].borrowDeadline,//期限
          timeLimitUnit: res.data.data.loanSignForNewbieList[0].timeLimitUnit,//借款时间单位
          investPercent: res.data.data.loanSignForNewbieList[0].investPercent,//进度
          loanState: res.data.data.loanSignForNewbieList[0].loanState,//状态
          endTime: new Date(res.data.data.loanSignForNewbieList[0].publishTime).getTime(), //截止时间
          currentTime: new Date(res.data.data.loanSignForNewbieList[0].currentTime).getTime(), //当前时间
          //endTime:'1528942200000',
          //currentTime: '1528942140000'
        });
      },
      fail(err) { },//请求失败
      complete() { },//请求完成后执行的函数
    });
    countdown(that)
  },
  /***下拉刷新***/
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.loadData();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  // 设置转发按钮
  // onShareAppMessage: function () {
  //   return {
  //     title: '', //转发标题
  //     desc: '!',//转发描述
  //     path: '',//转发路径
  //     imageUrl:''  //自定义图片
  //   }
  // }
});

//格式化年利率
function returnFloat(value) {
  var value = Math.round(parseFloat(value) * 100) / 100;
  var xsd = value.toString().split(".");
  if (xsd.length == 1) {
    value = value.toString() + ".0";
    return value;
  } else if (xsd.length > 1) {
    if (xsd[1].length < 2) {
      value = value.toString();
    }
    return value;
  }
};

//倒计时效果
function countdown(that) {
  var EndTime = that.data.endTime;
  var CurrentTime = that.data.currentTime;
  var total_micro_second = EndTime - CurrentTime;
  setTimeout(function () {
    total_micro_second -= 1000;
    countdown(that);
  },1000)

  if (total_micro_second >= 0) {
    that.setData({
      currentTime: parseInt(CurrentTime) + parseInt(1000),
      clock: dateformat(total_micro_second)
    });
  }else{
    that.setData({
      loanState: "2"
    });
  }
}

// 时间格式化输出，每1s都会调用一次
function dateformat(micro_second) {
  function formatTime(m) { return m < 10 ? '0' + m : m }
  var second = Math.floor(micro_second / 1000);// 总秒数
  var day = Math.floor(second / 3600 / 24);// 天数
  var hr = Math.floor(second / 3600 % 24);// 小时
  var min = Math.floor(second / 60 % 60);// 分钟
  var sec = Math.floor(second % 60);// 秒
  return day + "天" + formatTime(hr) + ":" + formatTime(min) + ":" + formatTime(sec);
}