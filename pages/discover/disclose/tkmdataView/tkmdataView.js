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
import * as echarts from '../../../../ec-canvas/echarts';
Page({
  data:{
    monthlyTransactionTitle:"每月交易情况",
    loanProportionTitle:"出借金额分布占比",
    durationRatioTitle:"项目期限分布占比",
    dealTotal:"223,21.57",
    dealCount:"13,087",
    manProportion:"49",
    thisItem: "1",
    //每月交易情况
    monthlyTransaction: {
      onInit: function (canvas, width, height) {
        const barChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(barChart);
        barChart.setOption(monthlyTransaction());
        return barChart;
      }
    },
    //出借金额分布占比
    loanProportion: {
      onInit: function (canvas, width, height) {
        const barChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(barChart);
        barChart.setOption(loanProportion());
        return barChart;
      }
    },
    //项目期限分布占比
    durationRatio: {
      onInit: function (canvas, width, height) {
        const barChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(barChart);
        barChart.setOption(durationRatio());
        return barChart;
      }
    },
    //项目金额分布占比
    itemProportion: {
      onInit: function (canvas, width, height) {
        const barChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(barChart);
        barChart.setOption(itemProportion());
        return barChart;
      }
    }
  },
  onLoad: function (options) {
  
  },
  onReady(e) {
    // 画布ID / 比例
    // 出借人性别占比
    this.undergraduate("sexProportion", this.data.manProportion); 
  },

  //点击切换图表
  monthlyTransactionTap(e) {
    this.setData({
      thisItem: e.target.dataset.num
    })
  },
  loanProportionTap(e) {
    this.setData({
      thisItem: e.target.dataset.num
    })
  },
  durationRatioTap(e) {
    this.setData({
      thisItem: e.target.dataset.num
    })
  },
  //圆形百分比
  undergraduate(id,man) {
    const ctx = wx.createCanvasContext(id)
    //画底圆
    ctx.beginPath()
    ctx.arc(150, 150, 120, 0, 2 * Math.PI)
    ctx.setLineWidth(8)
    ctx.setStrokeStyle("#e7eeff")
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(150, 150, 90, 0, 2 * Math.PI)
    ctx.setLineWidth(8)
    ctx.setStrokeStyle("#ffefe7")
    ctx.stroke()
    
    //男性占比
    ctx.beginPath()
    ctx.setLineCap('round')
    ctx.arc(150, 150, 120, -0.3 * Math.PI, (man / 100 * 2 - 0.3 )* Math.PI)
    ctx.setLineWidth(8)
    ctx.setStrokeStyle("#3f77ff")
    ctx.stroke()

    //女性占比
    ctx.beginPath()
    ctx.setLineCap('round')
    ctx.arc(150, 150, 90, 0.7 * Math.PI, ((100 - man) / 100 * 2 + 0.7)* Math.PI)
    ctx.setLineWidth(8)
    ctx.setStrokeStyle("#ff6e6f")
    ctx.stroke()

    //画上具体数字
    ctx.beginPath()
    ctx.setLineWidth(1)
    ctx.setStrokeStyle("#3f77ff")
    ctx.moveTo(250, 80)
    ctx.lineTo(260, 60)
    ctx.lineTo(250, 35)
    ctx.stroke()

    ctx.beginPath()
    ctx.setLineWidth(1)
    ctx.setStrokeStyle("#ff6e6f")
    ctx.moveTo(70, 200)
    ctx.lineTo(20, 220)
    ctx.lineTo(10, 265)
    ctx.stroke()

    ctx.setFontSize(12)
    ctx.setFillStyle("#4d80ff")
    ctx.fillText("男性：" + man, 240, 30)
    ctx.setFillStyle("#ff6e6f")
    ctx.fillText("女性：" + (100-man), 0, 280)
    ctx.setTextAlign('center')

    //画图
    ctx.draw()
  }
});

//每月交易情况
function monthlyTransaction() {
  return {
    color: ['#ffffff','#95a9ff'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {          // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ['月交易总额(万)','月交易总笔数(笔)'],
      x:'center',
      show:true,
      itemWidth: 10,  //图例标记的图形宽度
      itemHeight: 10, //图例标记的图形高度
      textStyle: {    //图例文字的样式
        color: '#ffffff',
        fontSize: 12
      }
    },
    grid: {
      left:10,
      right:10,
      bottom:20,
      top:50,
      containLabel:true
    },
    xAxis: [
      {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月'],
        splitLine: { show: false },//隐藏网格X轴线
        axisTick: { show: false },
        axisLine: {
          lineStyle: {
            color: '#e8eef9',  //X轴颜色
            width: 1,
          }
        },
        axisLabel: {
          color: '#ffffff'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          show:true,
          lineStyle: {
            color: 'rgba(165, 165, 165, 0.1)',  //X轴颜色
            width: 1,
          }
        },//隐藏网格X轴线
        axisTick: {show:false},
        axisLine: {
          lineStyle: {
            width: 0
          }
        },
        axisLabel: {
          show:false
        }
      }
    ],
    series: [
      {
        name: '月交易总额(万)',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'top',
            textStyle: {
              color: '#ffffff'
            }
          }
        },
        barMaxWidth: '7',//柱形最大宽度
        itemStyle: {
          emphasis: {
            barBorderRadius: [10, 10, 0, 0]
          },
          normal: {
            barBorderRadius: [10, 10, 0, 0],//柱形圆角
          }
        },
        data: [300, 270, 340, 344, 300, 320]
      },
      {
        name: '月交易总笔数(笔)',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'rightTop',
            textStyle: {
              color: '#ffffff'
            }
          }
        },
        barMaxWidth: '7',//柱形最大宽度
        itemStyle: {
          emphasis: {
            barBorderRadius: [10, 10, 0, 0]
          },
          normal: {
            barBorderRadius: [10, 10, 0, 0],//柱形圆角
          }
        },
        data: [120, 102, 141, 174, 190, 250]
      }
    ]
  };
};
//出借金额分布占比
function loanProportion() {
  return {
    color: ["#0fe8f5", "#fd962b", "#bd69fd", "#80b9f7", "#d7e0ff", "#FF9F7F"],
    series: [{
      type: 'pie',
      center: ['50%', '50%'],
      radius: ['15%', '75%'],
      label: {
        //默认不显示
        normal: {
          show: true,
          position: 'top',
          textStyle: {
            fontSize: '11',
            color:"#ffffff"
          }
        },
        //点击显示
        emphasis: {
          show: true,
          position: 'center',
          textStyle: {
            fontSize: '14'
          }
        }
      },
      labelLine: {
        normal: { show: true}
      },
      data: [
        {value:58.11, name:'5千以下'}, 
        {value:33.40, name:'5千-5万'}, 
        {value:5.96,  name:'5万-20万'}, 
        {value:2.37, name:'20万-100万'}, 
        {value:0.16, name:'100万以上'}
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX:0,
          shadowColor: 'rgba(135, 117, 255, 0.3)'
        }
      }
    }]
  };
}
//项目期限占比
function durationRatio() {
  return {
    color: ["#0fe8f5", "#fd962b", "#bd69fd", "#80b9f7", "#d7e0ff", "#FF9F7F"],
    series: [{
      type: 'pie',
      center: ['50%', '50%'],
      radius: ['15%', '75%'],
      label: {
        //默认不显示
        normal: {
          show: true,
          position: 'top',
          textStyle: {
            fontSize: '11',
            color: "#ffffff"
          }
        },
        //点击显示
        emphasis: {
          show: true,
          position: 'center',
          textStyle: {
            fontSize: '14'
          }
        }
      },
      data: [{
        value: 66.88,
        name: '270天以上'
      }, {
        value: 29.47,
        name: '180-270天'
      }, {
        value: 1.03,
        name: '90-180天'
      }, {
        value: 2.41,
        name: '30-90天'
      }, {
        value: 0.5,
        name: '30天以下'
      },
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 2, 2, 0.3)'
        }
      }
    }]
  };
};
//项目金额分布占比
function itemProportion() {
  return {
    color:["#3f77ff"],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {data: ['热度'],show:false},
    grid: {left:0,right:10,bottom:10,top:10,containLabel:true},
    xAxis: [
      {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(165, 165, 165, 0.1)',  //X轴颜色
            width: 1,
          }
        },
        axisLine: {
          lineStyle: {
            color: '#e5e5e5'
          }
        },
        axisLabel: {
          color: '#808080'
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['100万以上', '20-100万', '10-20万', '5-10万', '5万以下'],
        axisLine: {
          lineStyle: {
            color: '#e5e5e5'
          }
        },
        axisLabel: {
          color: '#808080'
        }
      }
    ],
    series: [
      {
        name: '热度',
        type: 'bar',
        data: [300, 270, 340, 344, 300],
        label: {
          normal: {
            show: false,
            position: 'top',
            textStyle: {
              color: '#ff0000'
            }
          }
        },
        barMaxWidth: '7',//柱形最大宽度
        itemStyle: {
          emphasis: {
            barBorderRadius: [0, 10, 10, 0]
          },
          normal: {
            barBorderRadius: [0, 10, 10, 0],//柱形圆角
          }
        }
      }
    ]
  };
};

