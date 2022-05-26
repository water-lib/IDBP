function lin_simple1() {

    var dom = document.getElementById("lintable1");
    var myChart = echarts.init(dom);
    var app = {};
    let option = null;
    function randomData() {
        now = new Date();
        value = base + Math.random() * 21 ;
        return {
            name: now.toString(),
            value: [
                now,
                Math.round(value)
            ]
        }
    }

    var data = [];
    var now = +new Date(1997, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var base=800;
    var value = Math.random() * 1000;
    for (var i = 0; i < 1000; i++) {
        data.push(randomData());
    }

    option = {
        title: {
            x:240,
            y:35,
            text: '机床能耗',
			textStyle: {
				color:"#3398DB",
				}


        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                params = params[0];
                var date = new Date(params.name);
                return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
            },
            axisPointer: {
                animation: false
            }
        },
        xAxis: {
            type: 'time',
            splitLine: {
                show: false
            }
        },
        yAxis: {
            min:750,
            max:850,
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            }
        },
		dataZoom: [
		            {
		                show: true,
		                start: 0,
		                end: 100
		            },
		            {
		                type: 'inside',
		                start: 0,
		                end: 100
		            },

		        ],
        series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data
        }]
    };

    setInterval(function () {

        data.shift();
        data.push(randomData());


        myChart.setOption({
            series: [{
                data: data
            }]
        });
    }, 1000);
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}



function lin_simple2() {
    var dom = document.getElementById("lintable2");
    var myChart = echarts.init(dom);
    var app = {};
//    function randomData() {
//        now = new Date(+now + oneDay);
//        value = value + Math.random() * 21 - 10;
//        return {
//            name: now.toString(),
//            value: [
//                [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
//                Math.round(value)
//            ]
//        }
//    }
//
//    var data = [];
//    var now = +new Date(2010, 9, 3);
//    var oneDay = 24 * 3600 * 1000;
//    var value = Math.random() * 1000;
//    for (var i = 0; i < 1000; i++) {
//        data.push(randomData());
//    }
    var zhendong = [0.11,0.931,-0.102,0.115,0.091,-0.124,-0.112,0.097,0.141,0.016,  -0.124,-0.091,0.019,0.045,0,0.15];
    var now = new Date();
    var atime = [];
    for (var i = 0; i<15;i++){
        atime.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
        now = new Date(now - 2000);
    }
    option = {
        title: {
            x:315,
            y:0,
            text: '振动',
			textStyle: {
				color:"#3398DB",
				}

        },
        tooltip: {
            trigger: 'axis',

            axisPointer: {
                animation: false
            }
        },
        xAxis: {
                        type : 'category',
                        boundaryGap : true,
                        data : atime
        },
        yAxis: {
            type: 'value',
            name:'震动(mm)',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            }
        },
		dataZoom: [

		            {
		                type: 'inside',
		                start: 0,
		                end: 100
		            },

		        ],
        series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: zhendong
        }]
    };
    //写入振动数组
    var j = 0;

    var zhendongs = [0.102,0.115,0.133,-0.048,0.011,0.066,0.122,0.038,-0.101,-0.051,    0.11,0.931,-0.102,0.115,0.091,-0.124,-0.112,0.097,0.141,0.016,    0,0.121,0.038,-0.123,0.045,-0.124,-0.091,0.019,0.045,0,0.15]
    setInterval(function () {
        var times = now.toLocaleTimeString().replace(/^\D*/,'');
        atime.shift();
        atime.push(times);
        if(j<30){
        zhendong.shift();
        zhendong.push(zhendongs[j]);
        j++
        }
        else{
        zhendong.shift();
        zhendong.push(zhendongs[0]);
        j = 1;
        }
        myChart.setOption(option);
    }, 1000);

}



function pie_alltime() {
    var dom = document.getElementById("pie1");
    var myChart = echarts.init(dom);
    var app = {};
    var option = null;
    option = {
        title : {
            text: '机床时间分布（小时）',
            x:'center',
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'关机'},
                    {value:310, name:'待机'},
                    {value:50, name:'空切'},
                    {value:500, name:'切削'},

                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
				pie1: {
					lable: {
						color:"#3398DB",
						fontFamily: "华文宋体",
					}
				}
            }
        ]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}



function pie_worktime() {
    var dom = document.getElementById("pie2");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    option = {
        title : {
            text: '机床检修',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series : [
            {
                name: '检修情况',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:1, name:'传动系统故障'},
                    {value:1, name:'控制系统故障'},
                    {value:3, name:'无故障'},
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    ;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
	//点击跳转到指定页面
	myChart.on('click', function (param){
	                   	var name=param.name;
	                   	if(name==="传动系统故障"){
	                   		top.location.href="../templates/order.html";
	                   	}else if(name==="控制系统故障"){
	                   		top.location.href="../templates/order.html";
	                    }else  {
							top.location.href="../templates/order.html";
						}
	       			});
	               	myChart.on('click');
}


function surface_list() {
    var dom = document.getElementById("surf_list");
    var myChart = echarts.init(dom);
    var app = {};
    app.title = '工件加工数量';

    option = {
        color: ['#3398DB'],
        title: {
            x: 130,
            y: 25,
            text: '工件加工数量',
            textStyle: {
                color: "#3398DB",
            }

        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['合格', '不合格'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '直接访问',
                type: 'bar',
                barWidth: '60%',
                data: [200, 10]
            }
        ]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
// 	myChart.on('click', function (param){
// 	                   	var name=param.name;
// 	                   	if(name=="合格"){
// 	                   		top.location.href="../templates/test.html";
// 	                   	}else if(name=="不合格"){
// 	                   		window.location.href="../templates/test.html";
// 	       			});
// 	               	myChart.on('click',eConsole);
// }


    function surface_rate1() {
        var dom = document.getElementById("surf_rate1");
        var myChart = echarts.init(dom);
        var app = {};
        option = null;
        var xdata = [];
        var ydata = [0.97, 0.98, 0.91, 0.96, 0.92];
        var now = new Date();
        for (var i = 0; i < 5; i++) {
            xdata.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
            now = new Date(now - 2000);
        }

        option = {
            title: {
                x: 150,
                y: 0,
                text: '产品合格率',
                textStyle: {
                    fontSize: '25px'
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                data: xdata
            },
            yAxis: {
                type: 'value',
                name: '合格率',
                max: 1,
                min: 0,
                boundaryGap: [0.2, 0.2]
            },
            series: {

                type: 'line',
                data: ydata
            }

        };


        var timeTicket;
        clearInterval(timeTicket);
        timeTicket = setInterval(function () {
            var myDate = new Date();
            var h = myDate.getHours();
            var m = myDate.getMinutes();
            var s = myDate.getSeconds();
            xData = h + ':' + m + ':' + s;
            yData = (0.9 + Math.random() * 0.1).toFixed(2);

            xdata.shift();
            xdata.push(xData);
            ydata.shift();
            ydata.push(yData);

            myChart.setOption(option);
        }, 1000);
    }


    function timeoftool() {
        var dom = document.getElementById("timetool");
        var myChart = echarts.init(dom);
        var app = {};
        option = null;
        app.title = '刀具使用时间';

        option = {
            color: ['#3398DB'],
            title: {
                x: 130,
                y: 25,
                text: '刀具使用时间',
                textStyle: {
                    color: "#55557f",
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',

                    data: ['φ2铣刀', '刀102', '刀103', "刀104", "刀105"],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '使用时间（h）'
                }
            ],
            series: [
                {
                    name: '直接访问',
                    type: 'bar',
                    barWidth: '60%',
                    data: [160, 220, 300, 360, 400]
                }
            ]
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
        myChart.on('click', function (params) {
            console.log(params);
            var name = params.name;

            if (name === "刀101") {
                window.open('tool.html');
            } else if (name === "刀102") {
                window.open('tool.html');
            } else if (name === "刀103") {
                window.open('tool.html');
            } else if (name === "刀104") {
                window.open('tool.html');
            } else if (name === "刀105") {
                window.open('tool.html');
            }
            //window.open(params.data.url);
        });
    }


    function flankwearoftool() {
        var dom = document.getElementById("toolwear");
        var myChart = echarts.init(dom);
        var app = {};
        option = null;
        app.title = '刀具后刀面磨损';

        option = {
            color: ['#3398DB'],
            title: {
                x: 130,
                y: 25,
                text: '刀具后刀面磨损',
                textStyle: {
                    color: "#aaaa00",
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '5%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',

                    data: ['刀101', '刀102', '刀103', "刀104", "刀105"],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '磨损量（mm）'
                }
            ],
            series: [
                {
                    name: '直接访问',
                    type: 'bar',
                    barWidth: '60%',
                    data: [1.0, 0.8, 1.1, 1.6, 1.3]
                }
            ]
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
        //点击跳转到指定页面
        myChart.on('click', function eConsole(param) {
            var name = param.name;
            if (name == "刀101") {
                top.location.href = "../templates/test.html";
            } else if (name == "刀102") {
                top.location.href = "../templates/test.html";
            } else if (name == "刀103") {
                top.location.href = "../templates/test.html";
            } else if (name == "刀104") {
                top.location.href = "../templates/test.html";
            } else {
                top.location.href = "../templates/test.html";
            }
        });
    }


    function toolhealth() {
        var dom = document.getElementById("toolhealth");
        var myChart = echarts.init(dom);
        var app = {};
        option = null;
        var option = {
            dataset: {
                source: [
                    ['score', 'amount', 'product'],
                    [500, 500, '101'],
                    [600, 600, '102'],
                    [420, 420, '103'],
                    [280, 280, '104'],
                    [340, 340, '105'],
                ]
            },
            title: {
                x: 130,
                y: 25,
                text: '刀具耐用度',
                textStyle: {
                    color: "#5500ff",
                }
            },
            grid: {containLabel: true},
            xAxis: {name: '（h）'},
            yAxis: {type: 'category'},
            visualMap: {
                orient: 'horizontal',
                left: 'center',
                min: 0,
                max: 600,
                text: ['健康', '损坏'],
                // Map the score column to color
                dimension: 0,
                inRange: {
                    color: ['#FF0000', '#3398DB']
                }
            },
            series: [
                {
                    type: 'bar',
                    encode: {
                        // Map the "amount" column to X axis.
                        x: 'amount',
                        // Map the "product" column to Y axis
                        y: 'product'
                    }
                }
            ]
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
    }

    function zhengdong() {
        var x1 = document.getElementById("lintable1");
        var x2 = document.getElementById("lintable2");
        var button1 = document.getElementById("zhendong");
        var button2 = document.getElementById("gonghao");
        x1.style.display = "inline";
        x2.style.display = "none";

    }


    function Pchart() {
        var x1 = document.getElementById("lintable1");
        var x2 = document.getElementById("lintable2");
        var button1 = document.getElementById("zhendong");
        var button2 = document.getElementById("gonghao");
        x1.style.display = "none";
        x2.style.display = "inline";
    }

}