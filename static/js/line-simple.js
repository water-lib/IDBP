

function lin_simple1() {

    var dom = document.getElementById("lintable1");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
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
            x:175,
            y:0,
            text: '机床能耗',
             textStyle:{
                fontSize:'25px'
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
            },
            axisLabel: {
            rotate:60,
            textStyle: {
           fontSize: '12px'
                    }
            }
        },
        yAxis: {
            min:750,
            max:850,
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            },
            axisLabel: {
            textStyle: {
           fontSize: '15px'
                    }
            }
        },
        series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data
        }]
    };

    setInterval(function () {
        for(var i=0;i<200;i++){
        data.shift();
        data.push(randomData());
        }
        myChart.setOption({
            series: [{
                data: data
            }]
        });
    }, 1000);;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}



function lin_simple2() {
    var dom = document.getElementById("lintable2");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    function randomData() {
        now = new Date(+now + oneDay);
        value = value + Math.random() * 21 - 10;
        return {
            name: now.toString(),
            value: [
                [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
                Math.round(value)
            ]
        }
    }

    var data = [];
    var now = +new Date(1997, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var value = Math.random() * 1000;
    for (var i = 0; i < 1000; i++) {
        data.push(randomData());
    }

    option = {
        title: {
            x:275,
            y:0,
            text: '/振动',
            textStyle:{
                fontSize:'25px'
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
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            },
             axisLabel: {
            textStyle: {
           fontSize: '15px'
                    }
            }
        },
        series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data
        }]
    };

    setInterval(function () {

        for (var i = 0; i < 5; i++) {
            data.shift();
            data.push(randomData());
        }

        myChart.setOption({
            series: [{
                data: data
            }]
        });
    }, 1000);;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}


function pie_alltime() {
    var dom = document.getElementById("pie1");
    var myChart = echarts.init(dom);
    var app = {};
    option = {
            title : {
            text: '机床时间分布（小时）',
            x:'center',
            textStyle:{
                fontStyle: 'normal',
                fontSize:'30px'
            }
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '120px',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'关机'},
                    {value:310, name:'待机'},
                    {value:100, name:'空切'},
                    {value:500, name:'切削'},

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
}


function pie_worktime() {
    var dom = document.getElementById("pie2");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    option = {
        title : {
            text: '机床检修',
            x:'center',
            textStyle:{
                fontStyle: 'normal',
                fontSize:'30px'
            }
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series : [
            {
                name: '检修情况',
                type: 'pie',
                radius : '120px',
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
}


function surface_list() {
    var dom = document.getElementById("surf_list");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    app.title = '工件表面质量';

    option = {
        color: ['#3398DB'],
        title: {
            x:130,
            y:25,
            text: '表面加工质量',
            textStyle:{
                fontSize:'30px'
            }
        },
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
            containLabel: true
        },
        xAxis : [
            {
                type: 'category',
                data: ['好', '中等', '差'],
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    textStyle: {
                        fontSize: '25px'
                    }
                },
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel: {
                    textStyle: {
                        fontSize: '25px'
                    }
                },
            },
        ],
        series : [
            {
                name:'直接访问',
                type:'bar',
                barWidth: '60%',
                data:[10, 52, 200]
            }
        ]
    };
    ;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}


function surface_rate() {
    var dom = document.getElementById("surf_rate");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    var data = [];
    var base=0.75;
    var now = +new Date(1997, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    function randomData() {
        var now = new Date();
        var value = base+Math.random() * 0.1;
        return {
            name: now.toString(),
            value: [
                now,
                value
            ]
        }
    }

    for (var i = 0; i < 1000; i++) {
        data.push(randomData());
    }

    option = {
        title: {
            x:130,
            y:70,
            text: '产品合格率',
            textStyle:{
                fontSize:'25px'
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
            } ,
            axisLabel: {
                    textStyle: {
                        fontSize: '12px'
                    }
                },
        },
        yAxis: {
            type: 'value',
            splitLine: {
                show: false
            },
            axisLabel: {
                    textStyle: {
                        fontSize: '15px'
                    }
                },
        },
        series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data
        }]
    };

    setInterval(function () { //隔一段时间调用一次函数
        for (var i = 0; i < 200; i++) {
            data.shift();
            data.push(randomData());
        }
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

function timeoftool() {
    var dom = document.getElementById("timetool");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;

    option = {

        color: ['#3398DB'],
        title:{
            x: 100,
            y: 25,
            text: '刀具使用时间',
            textStyle:{
                fontSize:"30px"
            }
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            width:'400px',
            left: '5%',
            right: '0%',
            bottom: '2%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                axisLabel:{
                    interval:0
                },
                data : ['刀1', '刀2', '刀3',"刀4","刀5"],
                axisLabel: {
                    textStyle: {//更改坐标轴文字颜色
                    fontSize : '20px'     //更改坐标轴文字大小
                    }
     },
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel: {
                    textStyle: {//更改坐标轴文字颜色
                    fontSize : '20px'     //更改坐标轴文字大小
                    }
     },
            }
        ],
        series : [
            {
                name:'直接访问',
                type:'bar',
                barWidth: 50,
                barGap:'100%',
                barCategoryGap:'80%',
                data:[10, 52, 200,200,250]
            }
        ]
    };
    ;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
    myChart.on('click', function(params) {
		console.log(params);
		var name = params.name;

		if (name == "刀1"){
		window.open('tool.html');
		}
		else if (name == "刀2"){
		window.open('tool.html');
		}
		else if (name == "刀3"){
		window.open('tool.html');
		}
		else if (name == "刀4"){
		window.open('tool.html');
		}
		else if (name == "刀5"){
		window.open('tool.html');
		}
		//window.open(params.data.url);
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
                [20, 20, '1'],
                [60, 60, '2'],
                [10, 10, '3'],
                [30, 30, '4'],
                [10, 10, '5'],
            ]
        },
        title:{
            x: 150,
            y: 10,
            text: '刀具健康预测',
            textStyle:{
                fontSize:'30px'
            },

        },
        grid: {containLabel: true},
        xAxis: {type: 'category',
                    axisLabel: {
            textStyle: {
           fontSize: '20px'
                    }
            }},
        yAxis: {name: 'H',
                    axisLabel: {
            textStyle: {
           fontSize: '20px'
                    }
            }},
        visualMap: {
            top:'1%',
            orient: 'horizontal',
            left: '60%',
            min: 10,
            max: 100,
            text: ['损坏', '健康'],
            // Map the score column to color
            itemWidth:30,
            itemHeight:300,
            dimension: 0,
            inRange: {
                color: ['#3398DB', '#FF0000']
            }
        },
        series: [
            {
                type: 'bar',
                encode: {
                    // Map the "amount" column to X axis.
                    x: 'product',
                    // Map the "product" column to Y axis
                    y: 'amount'
                }
            }
        ]
    };
    ;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}

function zhengdong() {
    var x1=document.getElementById("lintable1");
    var x2=document.getElementById("lintable2");
    var button1=document.getElementById("zhendong");
    var button2=document.getElementById("gonghao");
    x1.style.display="inline";
    x2.style.display="none";


}








function Pchart() {
    var x1=document.getElementById("lintable1");
    var x2=document.getElementById("lintable2");
    var button1=document.getElementById("zhendong");
    var button2=document.getElementById("gonghao");
    x1.style.display="none";
    x2.style.display="inline";

}
