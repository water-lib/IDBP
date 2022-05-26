// 柱状图1模块
(function () {
  // 实例化对象
  var myChart1 = echarts.init(document.querySelector(".bar .chart"));
  var toola = Math.random().toFixed(3);
  var tooltime = [toola , 0.870, 0.944, 0.833, 0.541];
  // 指定配置和数据
  var option1 = {
    color: ["#2f89cf"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: "0%",
      top: "10px",
      right: "0%",
      bottom: "4%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: [
          "氧气",
          "氮气",
          "二氧化碳",
          "氩气",
          "空气",

        ],
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: "12"
          }
        },
        axisLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        max:1,
        min:0,
        type: "value",
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: "12"
          }
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
            // width: 1,
            // type: "solid"
          }
        },
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        }
      }
    ],
    series: [
      {
        name: "使用时间",
        type: "bar",
        barWidth: "35%",
        data: tooltime,
        markLine: {
          silent: true,             //基线显示 隐藏
          label: {
            normal: {
              show: true,
              formatter: "警戒线"
            }
          },
          lineStyle: {
              normal: {
                  color: '#B6C2BA'  // 这儿设置安全基线颜色
                      }
                  },
                  data: [ {
                      yAxis: 0.3           // 安全基线 2
                  }]
          },
          itemStyle:{
              normal:{
                 label: {
                 show: true,		//开启显示
                 position: 'top',	//在上方显示
                 textStyle: {	    //数值样式
                 color: '#40C262',
                 fontSize: 16
                  }
                 },
        }
      }}
    ]
  };

  // 把配置给实例对象
    var a;
    setInterval(function(){
        if(tooltime[0] > 0.10){
        a =  tooltime[0] * 1 - 0.001;
        tooltime.shift();
        tooltime.unshift(a.toFixed(3));
        }
        else if(tooltime[0] >= 400){

        }
        myChart1.setOption(option1);
    },1000);
    myChart1.setOption(option1);
    // myChart1.on('click', function(params) {
	// 	console.log(params);
	// 	var name = params.name;
	// 	if (name == "氧气"){
	// 	window.open('tool.html');
	// 	}
	// 	else if (name == "氮气"){
	// 	window.open('tool.html');
	// 	}
	// 	else if (name == "二氧化碳"){
	// 	window.open('tool.html');
	// 	}
	// 	else if (name == "氩气"){
	// 	window.open('tool.html');
	// 	}
	// 	else if (name == "空气"){
	// 	window.open('tool.html');
	// 	}
	// 	//window.open(params.data.url);
	// });
})();

// 刀具后刀面磨损
(function () {
  // 基于准备好的dom，初始化echarts实例
  var myChart2 = echarts.init(document.querySelector(".line .chart"));

  // (1)准备数据
        var TP_value = 40.2;
        var kd = [];
        var Gradient = [];
        var leftColor = '';
        var showValue = '';
        var boxPosition = [65, 0];
        var TP_txt = ''
        // 刻度使用柱状图模拟，短设置1，长的设置3；构造一个数据
        for(var i = 0, len = 135; i <= len; i++) {
            if(i < 10 || i > 130) {
                kd.push('')
            } else {
                if((i - 10) % 20 === 0) {
                    kd.push('-3');
                } else if((i - 10) % 4 === 0) {
                    kd.push('-1');
                } else {
                    kd.push('');
                }
            }

        }
        //中间线的渐变色和文本内容
        if(TP_value > 60) {
            TP_txt = '温度偏高,需查看';
            Gradient.push({
                offset: 0,
                color: '#93FE94'
            }, {
                offset: 0.5,
                color: '#E4D225'
            }, {
                offset: 1,
                color: '#E01F28'
            })
        } else if(TP_value > 30) {
            TP_txt = '温度正常';
            Gradient.push({
                offset: 0,
                color: '#93FE94'
            }, {
                offset: 1,
                color: '#E4D225'
            })
        } else {
            TP_txt = '温度偏低';
            Gradient.push({
                offset: 1,
                color: '#93FE94'
            })
        }
       /*  if(TP_value > 62) {
            showValue = 62
        } else {
            if(TP_value < -60) {
                showValue = -60
            } else {
                showValue = TP_value
            }
        }
        if(TP_value < -10) {
            boxPosition = [65, -120];
        } */
    leftColor = Gradient[Gradient.length - 1].color;
  // 2. 指定配置和数据
  // var option2 = {
  //   color: ["#2f89cf"],
  //   tooltip: {
  //     trigger: "axis",
  //     axisPointer: {
  //       // 坐标轴指示器，坐标轴触发有效
  //       type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
  //     }
  //   },
  //   grid: {
  //     left: "0%",
  //     top: "10px",
  //     right: "0%",
  //     bottom: "4%",
  //     containLabel: true
  //   },
  //   xAxis: [
  //     {
  //       type: "category",
  //       data: [
  //         "端面铣刀1",
  //         "球面铣刀2",
  //         "外圆车刀3",
  //         "端面车刀4",
  //         "麻花钻5",
  //
  //       ],
  //       axisTick: {
  //         alignWithLabel: true
  //       },
  //       axisLabel: {
  //         textStyle: {
  //           color: "rgba(255,255,255,.6)",
  //           fontSize: "12"
  //         }
  //       },
  //       axisLine: {
  //         show: false
  //       }
  //     }
  //   ],
  //   yAxis: [
  //     {
  //       max:5,
  //       min:0,
  //       type: "value",
  //       axisLabel: {
  //         textStyle: {
  //           color: "rgba(255,255,255,.6)",
  //           fontSize: "12"
  //         }
  //       },
  //       axisLine: {
  //         lineStyle: {
  //           color: "rgba(255,255,255,.1)"
  //           // width: 1,
  //           // type: "solid"
  //         }
  //       },
  //       splitLine: {
  //         lineStyle: {
  //           color: "rgba(255,255,255,.1)"
  //         }
  //       }
  //     }
  //   ],
  //   series: [
  //     {
  //       name: "使用时间",
  //       type: "bar",
  //       barWidth: "35%",
  //       data: mosun,
  //       markLine: {
  //         silent: true,             //基线显示 隐藏
  //         label: {
  //           normal: {
  //             show: true,
  //             formatter: "警戒线"
  //           }
  //         },
  //         lineStyle: {
  //             normal: {
  //                 color: '#b6c2ba'  // 这儿设置安全基线颜色
  //                     }
  //                 },
  //                 data: [ {
  //                     yAxis: 4.5           // 安全基线 2
  //                 }]
  //         },
  //         itemStyle:{
  //             normal:{
  //                label: {
  //                show: true,		//开启显示
  //                position: 'top',	//在上方显示
  //                textStyle: {	    //数值样式
  //                color: '#40C262',
  //                fontSize: 16
  //                 }
  //                },
  //       }
  //     }}
  //   ]
  // };
  // 3. 把配置和数据给实例对象
    var option2 = {

                    title: {
                        text: '温度计',
                        show: false
                    },
                    grid:{
                        top:'5%',
                        left:'30%',
                        bottom:'10%'
                    },
                     yAxis: [{
                        show: false,
                        data: [],
                        min: 0,
                        max: 135,
                        axisLine: {
                            show: false
                        }
                    }, {
                        show: false,
                        min: 0,
                        max: 50,
                    }, {
                        type: 'category',
                        data: ['', '', '', '', '', '', '', '', '', '', '°C'],
                        position: 'left',
                        offset: -80,
                        axisLabel: {
                            fontSize: 10,
                            color: 'white'
                        },
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                    }],

                    xAxis: [{
                        show: false,
                        min: -10,
                        max: 80,
                        data: []
                    }, {
                        show: false,
                        min: -10,
                        max: 80,
                        data: []
                    }, {
                        show: false,
                        min: -10,
                        max: 80,
                        data: []
                    }, {
                        show: false,
                        min: -5,
                        max: 80,

                    }],
                    series: [{
                        name: '条',
                        type: 'bar',
                        // 对应上面XAxis的第一个对)象配置
                        xAxisIndex: 0,
                        data: [{
                            value: (TP_value + 10),//这个改那个颜色刻度的
                            label: {
                                normal: {
                                    show: true,
                                    position: boxPosition,
                                    /*backgroundColor: {
                                        image: 'plugin/subway_beijing/images/power/bg5Valuebg.png',//文字框背景图
                                    },*/
                                    width: 40,
                                    height: 100,
                                    formatter: '{back| ' + TP_value + ' }{unit|°C}\n{downTxt|' + TP_txt + '}',
                                    rich: {
                                        back: {
                                            align: 'center',
                                            lineHeight: 50,
                                            fontSize: 40,
                                            fontFamily: 'digifacewide',
                                            color: leftColor
                                        },
                                        unit: {
                                            fontFamily: '微软雅黑',
                                            fontSize: 15,
                                            lineHeight: 50,
                                            color: leftColor
                                        },
                                        downTxt: {
                                            lineHeight: 50,
                                            fontSize: 25,
                                            align: 'center',
                                            color: '#fff'
                                        }
                                    }
                                }
                            }
                        }],

                        barWidth: 10,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, Gradient)
                            }
                        },
                        z: 2
                    }, {
                        name: '白框',
                        type: 'bar',
                        xAxisIndex: 1,
                        barGap: '-100%',
                        data: [134],
                        barWidth: 18,
                        itemStyle: {
                            normal: {
                                color: '#0C2E6D',
                                barBorderRadius: 50,
                            }
                        },
                        z: 1
                    }, {
                        name: '外框',
                        type: 'bar',
                        xAxisIndex: 2,
                        barGap: '-100%',
                        data: [135],
                        barWidth: 25,
                        itemStyle: {
                            normal: {
                                color: '#4577BA',
                                barBorderRadius: 50,
                            }
                        },
                        z: 0
                    }, {
                        name: '圆',
                        type: 'scatter',
                        hoverAnimation: false,
                        data: [0],
                        xAxisIndex: 0,
                        symbolSize: 28,
                        itemStyle: {
                            normal: {
                                color: '#93FE94',
                                opacity: 1,
                            }
                        },
                        z: 2
                    }, {
                        name: '白圆',
                        type: 'scatter',
                        hoverAnimation: false,
                        data: [0],
                        xAxisIndex: 1,
                        symbolSize: 30,
                        itemStyle: {
                            normal: {
                                color: '#0C2E6D',
                                opacity: 1,
                            }
                        },
                        z: 1
                    }, {
                        name: '外圆',
                        type: 'scatter',
                        hoverAnimation: false,
                        data: [0],
                        xAxisIndex: 2,
                        symbolSize: 40,
                        itemStyle: {
                            normal: {
                                color: '#4577BA',
                                opacity: 1,
                            }
                        },
                        z: 0
                    }, {
                        name: '刻度',
                        type: 'bar',
                        yAxisIndex: 0,
                        xAxisIndex: 3,
                        label: {
                            normal: {
                                show: true,
                                position: 'left',
                                distance: 10,
                                color: 'white',
                                fontSize: 14,
                                formatter: function(params) {
                                    if(params.dataIndex > 130 || params.dataIndex < 10) {
                                        return '';
                                    } else {
                                        if((params.dataIndex - 10) % 20 === 0) {
                                            return params.dataIndex - 10;//这个改刻度的，当减70的时候刻度是从-60开始不是从零开始
                                        } else {
                                            return '';
                                        }
                                    }
                                }
                            }
                        },
                        barGap: '-100%',
                        data: kd,
                        barWidth: 1,
                        itemStyle: {
                            normal: {
                                color: 'white',
                                barBorderRadius: 120,
                            }
                        },
                        z: 0
                    }]
                };
  setInterval(function(){
    if (TP_value<30){
        TP_value = TP_value + 3;
    }
    else if(TP_value < 50)
    {
        TP_value += 1;
    }
    else if(TP_value < 60)
    {
        TP_value += Math.random().toFixed(2);
    }
    else if(TP_value > 60)
    {
        TP_value = (Math.random().toFixed(3)*10 + 60);
    }
    myChart2.setOption(option2);
},1000);
  // 重新把配置好的新数据给实例对象
  myChart2.setOption(option2);
  window.addEventListener("resize", function () {
    myChart2.resize();
  });
})();

// 饼形图定制
// 折线图定制
(function () {
  // 基于准备好的dom，初始化echarts实例
var myChart3 = echarts.init(document.querySelector(".pie .chart"));
  var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
  var data = [{value: 60, name: '电能'},{value: 40, name: '二氧化碳'},{value: 20, name: '树'},]
  var option3 = {
    //图标位置

    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}"
    },
    legend: {
        data: ['电能','二氧化碳','树'],
        orient: 'vertical',
        top:'20%',
        left:'right',
        formatter: function(name) {
            var data = option3.series[0].data;
            var total = 0;
            var tarValue;
            for (var i = 0; i < data.length; i++) {
              total += data[i].value;
              if (data[i].name == name) {
                tarValue = data[i].value;
              }
            }
            var v = tarValue;
            var p = Math.round(((tarValue / total) * 100));
            return `${name}  ${v}单位`;
          },
        textStyle:{
        color:'#ffffff'
        }
    },

    series: [
        {
            name:'节约能源',
            type:'funnel',
            left: '0%',
            top: "5%",
            bottom: "5%",
            //x2: 80,
            width: '70%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
                show: true,
                position: 'inside',
                textStyle: {
                    color: '#0c0c0c'
                }
            },
            labelLine: {
                length: 10,
                lineStyle: {
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                borderColor: '#a4ff74',
                borderWidth: 1,
                normal: {
                color: function(params) {
                  //自定义颜色
                  var colorList = [
                    "#72ffa0",
                    "#ff8289",
                    "#ded137",
                  ];
                  return colorList[params.dataIndex];
                }
              }
            },
            emphasis: {
                label: {
                    fontSize: 20
                }
            },
            data: data
        }
    ]
  };
  myChart3.setOption(option3);
  setInterval(function(){
      if (data[0].value < 500){
      data[0].value += 3;
      data[1].value += 2;
      data[2].value += 1;
      }
      else {
          data[0].value = 60;
          data[1].value = 40;
          data[2].value = 20;
      }
      myChart3.setOption(option3);
  },60000);
  // 使用刚指定的配置项和数据显示图表。


  window.addEventListener("resize", function () {
    myChart3.resize();
  });
})();


// 学习进度柱状图模块
//机床分布小时和机床维修
(function () {
  // 基于准备好的dom，初始化echarts实例
    // 基于准备好的dom，初始化echarts实例
  var myChart4 = echarts.init(document.querySelector(".bar1 .chart"));

  option4 = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {d}%'
    },
    legend: {
        textStyle:{
            color:'#ffffff'
        },
        orient: 'vertical',
        left:"5%",
        top:"30%",
        data: ['正常', '传动系统故障', '控制系统故障',]
    },
    series: [
        {
            name: '机床加工时间分布',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '40%'],
            center: ['75%', '50%'],
            label: {
                position: 'inner',
                fontSize: 12,
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 50, name: '切削'},
                {value: 30, name: '关机'},
                {value: 10, name: '空切'},
                {value: 10, name: '待机', selected: true}
            ]
        },
        {
            name: '机床维修情况',
            type: 'pie',
            radius: ['60%', '85%'],
            center: ['75%', '50%'],
            labelLine: {    //引导线设置
                 normal: {
                      show: false,   //引导线显示
                 }
           },
            label: {        //展示文本设置
                normal: {
                     show: false,     //展示
                     position: 'outside'      // outside表示文本显示位置为外部
                },
                emphasis: {    //文本样式
                    show: true,    //展示
                    textStyle: {    //文本样式
                        fontSize: '14',
                        fontWeight: '600',
                    }
                 }
           },
            data: [
                {value: 90, name: '正常'},
                {value: 4, name: '传动系统故障'},
                {value: 6, name: '控制系统故障'},
            ]
        }
    ]
};

  // 使用刚指定的配置项和数据显示图表。
  myChart4.setOption(option4);
  window.addEventListener("resize", function () {
    myChart4.resize();
  });
})();
// 折线图 优秀作品
(function () {
  // 基于准备好的dom，初始化echarts实例
  var myChart4 = echarts.init(document.querySelector(".line1 .chart"));
  var gonghao = [536.109,517.966,504.428,525.799,537.583,529.089,505.098,511.169,525.451,544.097,    528.215,520.07,512.773,542.654,524.47];
  var zhendong = [0.11,0.931,-0.102,0.115,0.091,-0.124,-0.112,0.097,0.141,0.016,  -0.124,-0.091,0.019,0.045,0,0.15];
  var atime = [];
  var myDates = new Date();
  for (var i = 0; i<15;i++){
       var hh = myDates.getHours();
      var mm = myDates.getMinutes();
      var ss = myDates.getSeconds();
      var xDatas = hh +':' + mm + ':' + ss;
      atime.unshift(xDatas);
      myDates = new Date(myDates - 2000);
  }
  option4 = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        lineStyle: {
          color: "#dddc6b"
        }
      }
    },
    legend: {
      top: "0%",
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
    },
    grid: {
      left: "10",
      top: "15",
      right: "5%",
      bottom: "15",
      containLabel: true
    },

    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        axisLabel: {
            interval:0,//横轴信息全部显示
                         rotate:-30,//-30度角倾斜显示
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12
          }
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.2)"
          }
        },

        data: atime
      },
        {
            show:false,
           type: "category",
        boundaryGap: false,
        axisLabel: {
            interval:0,//横轴信息全部显示
                         rotate:-30,//-30度角倾斜显示
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12
          }
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.2)"
          }
        },

        data: atime
        }
    ],

    yAxis: [
      {
        type : 'value',
        scale: true,
        name : '震动(mm)',
          show:false,
        nameTextStyle:{
            color:'#FFFEF3'
          },
        boundaryGap: [0.2, 0.2],
        axisTick: { show: false },//坐标轴刻度
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        },
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12
          }
        },
        splitLine: {
            show:false,
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        }
      },
        {
        type : 'value',
        scale: true,
        name : '功率(w)',
            position:'left',
        nameTextStyle:{
            color:'#FFFEF3'
          },
        boundaryGap: [0.2, 0.2],
        axisTick: { show: false },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        },
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12
          }
        },

        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        }
        }
    ],
    series: [
      {
        name: "功率",
        type: "line",
        xAxisIndex: 1,
        yAxisIndex: 1,
        smooth: true,
        symbol: "circle",
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          normal: {
            color: "#0184d5",
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(1, 132, 213, 0.4)"
                },
                {
                  offset: 0.8,
                  color: "rgba(1, 132, 213, 0.1)"
                }
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)"
          }
        },
        itemStyle: {
          normal: {
            color: "#0184d5",
            borderColor: "rgba(221, 220, 107, .1)",
            borderWidth: 12
          }
        },
        data: gonghao
      },
      // {
      //   name: "振动",
      //   type: "line",
      //   smooth: true,
      //   symbol: "circle",
      //   symbolSize: 5,
      //   showSymbol: false,
      //   lineStyle: {
      //     normal: {
      //       color: "#00d887",
      //       width: 2
      //     }
      //   },
      //   areaStyle: {
      //     normal: {
      //       color: new echarts.graphic.LinearGradient(
      //         0,
      //         0,
      //         0,
      //         1,
      //         [
      //           {
      //             offset: 0,
      //             color: "rgba(0, 216, 135, 0.4)"
      //           },
      //           {
      //             offset: 0.8,
      //             color: "rgba(0, 216, 135, 0.1)"
      //           }
      //         ],
      //         false
      //       ),
      //       shadowColor: "rgba(0, 0, 0, 0.1)"
      //     }
      //   },
      //   itemStyle: {
      //     normal: {
      //       color: "#00d887",
      //       borderColor: "rgba(221, 220, 107, .1)",
      //       borderWidth: 12
      //     }
      //   },
      //   data: zhendong
      // }
    ]
  };
  var j = 0;
  var power = [542.952, 546.797, 535.13, 543.039, 526.186, 511.596, 546.422, 532.128, 525.359, 507.129, 544.896, 531.461, 528.004, 528.978, 548.094, 513.395, 503.058, 520.141, 532.782, 509.958, 524.953, 502.892, 525.894, 500.354, 521.873, 539.84, 536.868, 542.268, 514.335, 533.095];
  var zhendongs = [0.102,0.115,0.133,-0.048,0.011,0.066,0.122,0.038,-0.101,-0.051,0.11,0.931,-0.102,0.115,0.091,-0.124,-0.112,0.097,0.141,0.016,    0,0.121,0.038,-0.123,0.045,-0.124,-0.091,0.019,0.045,0,0.15]

  setInterval(function () {

        var myDate = new Date();
        var h = myDate.getHours();
        var m = myDate.getMinutes();
        var s = myDate.getSeconds();
        var xData = h +':' + m + ':' + s;

        atime.shift();
        atime.push(xData);
        if(j<25){
            zhendong.shift();
            zhendong.push(zhendongs[j]);
            gonghao.shift();
            gonghao.push(power[j]);
            j++
        }
        else{
        zhendong.shift();
        zhendong.push(zhendongs[0]);
        gonghao.shift();
        gonghao.push(power[0]);
        j = 1;
        }
        myChart4.setOption(option4);
    }, 1000);
    // 使用刚指定的配置项和数据显示图表。
  myChart4.setOption(option4);
  window.addEventListener("resize", function () {
    myChart4.resize();
  });
})();

//加工工件
(function () {
    var myChart5 = echarts.init(document.querySelector(".bar4  .chart"));
    var hege = [2090,42];
    option5 = {
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top:'15%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['合格', '不合格'],
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
            textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12
          }
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.2)"
          }
        },
        }
    ],
    yAxis : [
        {
            type : 'value',
            minInterval: 1,
            axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: "12"
          }
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
            // width: 1,
            // type: "solid"
          }
        },
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        }
        }
    ],
    series : [
        {
            type:'bar',
            barWidth: '30%',
            itemStyle: {
                normal: {
                    //数值显示在柱状上方
                    label:{
                    show:true,
                    position:'top',
                    textStyle:{
                        color:'#ffffff',
                        fontSize:12
                    }
                    },
                color: function(params) {
                    let colorList = [
                        "#3398DB",
                        "#c23531",
                    ];
                    return colorList[params.dataIndex];
                }},
            },
            data:hege
        }
    ]
    };

    setInterval(function(){
        if(hege[0] % 49 != 0 || hege[0] == 0){
            hege[0] += 1;
        }
        else if((hege[0] + hege[1]) % 50 == 0 && hege[0] + hege[1] != 10000){
            hege[0]+=1;
        }
        else if(hege[0] + hege[1] == 10000){
            hege[0] = 0;
            hege[1] = 0;
        }
        else if(hege[0] % 49 == 0 && hege[0] != 0){
            hege[1] += 1;
        }

    myChart5.setOption(option5);
    },6000);
  // 3. 配置项和数据给我们的实例化对象
  myChart5.setOption(option5);
  // 4. 当我们浏览器缩放的时候，图表也等比例缩放
  window.addEventListener("resize", function () {
    // 让我们的图表调用 resize这个方法
    myChart5.resize();
  });
})();
// 点位分布统计模块
(function () {
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".bar5  .chart"));
    // 2. 指定配置项和数据
    var xdatarate = ['第五周','第四周','第三周','第二周','第一周'];
    var ydatarate = ['未统计',0.99,0.97,0.98,0.96];
    var option = {
            tooltip : {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                top:'20%',
                containLabel: true
            },
            xAxis:{
                type : 'category',
                boundaryGap : true,
                data : xdatarate,
                axisTick: {
                alignWithLabel: true
                    },
                    axisLabel: {
                    textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: 12
                  }
                },
                axisLine: {
                  lineStyle: {
                    color: "rgba(255,255,255,.2)"
                  }
                },
            },
            yAxis:{
                type : 'value',
                name : '合格率',
                nameTextStyle: {
                  color: "#FFFFFF"
                },
                max: 1,
                min: 0,
                boundaryGap: [0.2, 0.2],
                axisLabel: {
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: "12"
                  }
                },
                axisLine: {
                  lineStyle: {
                    color: "rgba(255,255,255,.1)"
                    // width: 1,
                    // type: "solid"
                  }
                },
                splitLine: {
                  lineStyle: {
                    color: "rgba(255,255,255,.1)"
                  }
                }
            },
            series:[{

                type:'bar',
                data:ydatarate,
                itemStyle: {
                    normal: {
                        //数值显示在柱状上方
                        label:{
                        show:true,
                        position:'top',
                        textStyle:{
                            color:'#FFFFFF',
                            fontSize:12
                        }
                        },
                        //每根柱子颜色设置
                        color: function(params) {
                            let colorList = [
                                "#c23531",
                                "#2f4554",
                                "#61a0a8",
                                "#d48265",
                                "#91c7ae",
                            ];
                            return colorList[params.dataIndex];
                        }
                    }
                },

    }]
    };
  // 3. 配置项和数据给我们的实例化对象
  myChart.setOption(option);
  // 4. 当我们浏览器缩放的时候，图表也等比例缩放
  window.addEventListener("resize", function () {
    // 让我们的图表调用 resize这个方法
    myChart.resize();
  });
})();
