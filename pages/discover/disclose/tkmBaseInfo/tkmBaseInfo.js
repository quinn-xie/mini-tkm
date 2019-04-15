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
const app = getApp();
Page({
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },
  /**
   * 页面的初始数据
   */
  data: {
    //只支持 http 或者 https 协议的网络图片地址,否则本地打不开预览图片
    imgList: ['https://www.taikongma.com/resources/static/images/organize.png'] 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
  },
  onReady: function(e){
    // 画布ID / 起终点 / 圆半径 / 圆圈底色 / 圆圈前景色 / 投影色 / 圆圈宽度 / 占比 / 开始弧度 / 结束弧度
    //股东股权占比
    this.undergraduate("sharesa", 50, 35, '#f4f8ff', '#4d80ff', "#8eaeff", 5, '34%', 0.8 * Math.PI, 1.4 * Math.PI, 35, 55); //袁瑞
    this.undergraduate("sharesb", 50, 35, '#f4f8ff', '#fcdc30', "#fef0a5", 5, '33%', 0.1 * Math.PI, 0.7 * Math.PI, 35, 55); //黄伟明
    this.undergraduate("sharesc", 50, 35, '#f4f8ff', '#8afd35', "#cbfcac", 5, '33%', -0.6 * Math.PI, -0.1 * Math.PI, 35, 55); //陈少林
    //平台从业人员概况
    this.undergraduate("undergraduate", 50,35, '#f4f8ff', '#4d80ff', "#8eaeff", 5, '68%', 0.25 * Math.PI, 1.61* Math.PI,35,55); //本科
    this.undergraduate("junior", 50, 35, '#f4f8ff', '#fcdc30', "#fef0a5", 5, '28%', -0.2 * Math.PI, 0.36 * Math.PI, 35, 55); //专科
    this.undergraduate("master", 50, 35, '#f4f8ff', '#ff5b5b', "#ffc0c0", 5, '4%', -0.5 * Math.PI, -0.3 * Math.PI, 35, 55); //硕士
    //年龄分布占比
    this.undergraduate("sorta", 40, 28, '#f4f8ff', '#4d80ff', "#8eaeff", 5, '60%', 0.35 * Math.PI, 1.4 * Math.PI, 25, 45); //25-30岁：15人
    this.undergraduate("sortb", 40, 28, '#f4f8ff', '#8afd35', "#cbfcac", 5, '24%', -0.2 * Math.PI, 0.36 * Math.PI, 25, 45); //31-35岁：6人
    this.undergraduate("sortc", 40, 28, '#f4f8ff', '#fcdc30', "#fef0a5", 5, '8%', -0.7 * Math.PI, -0.5 * Math.PI, 25, 45); //35岁以上：2人
    this.undergraduate("sortd", 40, 28, '#f4f8ff', '#ff5b5b', "#ffc0c0", 5, '8%', -0.5 * Math.PI, -0.3 * Math.PI, 25, 45); //25岁以下：2人
    
  },
  /**
   * 点击预览大图
   */
  previewImage: function (e) {
    var index = e.currentTarget.dataset.index;
    var imgList = this.data.imgList;
    wx.previewImage({
      current: imgList[index],  //当前图片地址
      urls: imgList,            //所有要预览的图片的地址集合数组形式
    })
  },

  //圆形百分比
  undergraduate(id, start, radius, basebg, frontbg, shadowColor, LineWidth, percent,begin,end,fontStart,fontEnd){
    const ctx = wx.createCanvasContext(id)
    //画一个底圆
    ctx.beginPath()
    ctx.arc(start, start, radius, 0, 2 * Math.PI)
    ctx.setLineWidth(LineWidth)
    ctx.setStrokeStyle(basebg)
    ctx.stroke()
    //画上面百分占比圆
    ctx.beginPath()
    ctx.setLineCap('round')
    ctx.arc(start, start, radius, begin, end)
    ctx.setLineWidth(LineWidth)
    ctx.setStrokeStyle(frontbg)
    ctx.shadowColor = shadowColor;
    ctx.shadowOffsetX = "0"
    ctx.shadowOffsetY = "0"
    ctx.shadowBlur = "5"
    ctx.stroke()
    //画上百分比
    ctx.setFontSize(16)
    ctx.setFillStyle("#4d80ff")
    ctx.fillText(percent, fontStart, fontEnd)
    ctx.setTextAlign('center')
    //画图
    ctx.draw()
  }

})