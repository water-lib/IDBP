// 柱状图1模块
(function () {
  // 实例化对象
  var myChart1 = echarts.init(document.querySelector(".bar .chart"));
  var toola = (Math.random() * 100).toFixed(1);
  var tooltime = [toola , 330, 230, 180, 160];
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
          "端面铣刀1",
          "球面铣刀2",
          "外圆车刀3",
          "端面车刀4",
          "麻花钻5",

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
        max:400,
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
                      yAxis: 350           // 安全基线 2
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
        if(tooltime[0] < 400){
        a = 0.1 + tooltime[0] * 1;
        tooltime.shift();
        tooltime.unshift(a.toFixed(1));
        }
        else if(tooltime[0] >= 400){

        }
        myChart1.setOption(option1);
    },1000);
    myChart1.setOption(option1);
    myChart1.on('click', function(params) {
		console.log(params);
		var name = params.name;
		if (name == "端面铣刀1"){
		window.open('tool.html');
		}
		else if (name == "球面铣刀2"){
		window.open('tool.html');
		}
		else if (name == "外圆车刀3"){
		window.open('tool.html');
		}
		else if (name == "外圆车刀4"){
		window.open('tool.html');
		}
		else if (name == "麻花钻5"){
		window.open('tool.html');
		}
		//window.open(params.data.url);
	});
})();

// 刀具后刀面磨损
(function () {
  // 基于准备好的dom，初始化echarts实例
  var myChart2 = echarts.init(document.querySelector(".line .chart"));

  // (1)准备数据
  var mosun1 = (Math.random() + 3).toFixed(3);
  var mosun = [mosun1, 3.1, 1.6, 0.8, 0.7];

  // 2. 指定配置和数据
  var option2 = {
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
          "端面铣刀1",
          "球面铣刀2",
          "外圆车刀3",
          "端面车刀4",
          "麻花钻5",

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
        max:5,
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
        data: mosun,
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
                  color: '#b6c2ba'  // 这儿设置安全基线颜色
                      }
                  },
                  data: [ {
                      yAxis: 4.5           // 安全基线 2
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
  // 3. 把配置和数据给实例对象
  setInterval(function(){
    if (mosun[0]<5){
        a =  0.001 + mosun[0] * 1;
        mosun.shift();
        mosun.unshift(a.toFixed(3));

    }
    else if(mosun[0] >= 5)
    {

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

  var data = [(((Math.random())*50).toFixed(1)*1+350),100, 120, 300, 200 ];
  var titlename = ["端面铣刀1","球面铣刀2","外圆车刀3","端面车刀4","麻花钻5",];
  var valdata = ["", "", "", "", ""];
  var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
  var option3 = {
    //图标位置
    grid: {
      top: "5%",
      left: "20%",
      bottom: "10%"
    },
    xAxis: {
      show: false
    },
    yAxis: [
      {
        show: true,
        data: titlename,
        inverse: true,
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: "#fff",

          rich: {
            lg: {
              backgroundColor: "#339911",
              color: "#fff",
              borderRadius: 15,
              // padding: 5,
              align: "center",
              width: 15,
              height: 15
            }
          }
        }
      },
      {
        show: true,
        inverse: true,
        data: valdata,
        axisLabel: {
          textStyle: {
            fontSize: 12,
            color: "#fff"
          }
        }
      }
    ],
    series: [
      {
        name: "条",
        type: "bar",
        yAxisIndex: 0,
        data: data,
        barCategoryGap: 50,
        barWidth: 10,
        itemStyle: {
          normal: {
            barBorderRadius: 20,
            color: function (params) {
              var num = myColor.length;
              return myColor[params.dataIndex % num];
            }
          }
        },
        label: {
          normal: {
            show: true,
            position: "inside",
            formatter: "{c}"
          }
        }
      },
      {
        name: "框",
        type: "bar",
        yAxisIndex: 1,
        barCategoryGap: 50,
        data: [400, 400, 400, 400, 400],
        barWidth: 15,
        itemStyle: {
          normal: {
            color: "none",
            borderColor: "#00c1de",
            borderWidth: 3,
            barBorderRadius: 15
          }
        }
      }
    ]
  };
  myChart3.setOption(option3);
  setInterval(function(){
      a =  data[0]*1 - 0.1;
      data.shift();
      data.unshift(a.toFixed(1))
      myChart3.setOption(option3);
  },1000);
  // 使用刚指定的配置项和数据显示图表。


  window.addEventListener("resize", function () {
    myChart3.resize();
  });
})();
// 学习进度柱状图模块
//机床分布小时和机床维修
(function () {
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
                {value: 5, name: '传动系统故障'},
                {value: 5, name: '控制系统故障'},
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
          show:true,
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
            position:'right',
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
      {
        name: "振动",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          normal: {
            color: "#00d887",
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
                  color: "rgba(0, 216, 135, 0.4)"
                },
                {
                  offset: 0.8,
                  color: "rgba(0, 216, 135, 0.1)"
                }
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)"
          }
        },
        itemStyle: {
          normal: {
            color: "#00d887",
            borderColor: "rgba(221, 220, 107, .1)",
            borderWidth: 12
          }
        },
        data: zhendong
      }
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
    var myChart6 = echarts.init(document.querySelector(".bar4  .chart"));
    var hege = [0,0];
    option6 = {
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
                        fontSize:16
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
        else if((hege[0] + hege[1]) % 50 == 0 && hege[0] + hege[1] != 1000){
            hege[0]+=1;
        }
        else if(hege[0] + hege[1] == 1000){
            hege[0] = 0;
            hege[1] = 0;
        }
        else if(hege[0] % 49 == 0 && hege[0] != 0){
            hege[1] += 1;
        }

    myChart6.setOption(option6);
    },60000);
  // 3. 配置项和数据给我们的实例化对象
  myChart6.setOption(option6);
  // 4. 当我们浏览器缩放的时候，图表也等比例缩放
  window.addEventListener("resize", function () {
    // 让我们的图表调用 resize这个方法
    myChart6.resize();
  });
})();
// 点位分布统计模块
(function () {
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".bar5  .chart"));
    // 2. 指定配置项和数据
    var xdatarate = ['第五周','第四周','第三周','第二周','第一周'];
    var ydatarate = ['未统计',0.98,0.91,0.96,0.92];
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
                            fontSize:16
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
//地球图
(function () {
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".word  .chart"));
    // 2. 指定配置项和数据
    var xdatarate = ['第五周','第四周','第三周','第二周','第一周'];
    var ydatarate = ['未统计',0.98,0.91,0.96,0.92];
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
                            fontSize:'100%'
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