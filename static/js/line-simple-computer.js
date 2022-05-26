

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
            x:240,
            y:35,
            text: '机床能耗'

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
            x:320,
            y:35,
            text: '振动'
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
    option = null;
    option = {
        title : {
            text: '机床时间分布（小时）',
            x:'center'
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
                type : 'category',
                data : ['好', '中等', '差'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
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
    function randomData() {
        now = new Date();
        value = base + Math.random() * 0.08;
        return {
            name: now.toString(),
            value: [
                now,
                value
            ]
        }
    }

    var data = [];
    var now = +new Date(1997, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var base=0.7;
    var value = 0.7;
    for (var i = 0; i < 1000; i++) {
        data.push(randomData());
    }

    option = {
        title: {
            x:130,
            y:40,
            text: '产品合格率',
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

        data.shift();
        data.push(randomData());


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

function timeoftool() {
    var dom = document.getElementById("timetool");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    app.title = '刀具使用时间';

    option = {
        color: ['#3398DB'],
        title:{
            x: 130,
            y: 25,
            text: '刀具使用时间',
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
                type : 'category',
                data : ['刀1', '刀2', '刀3',"刀4","刀5"],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'直接访问',
                type:'bar',
                barWidth: '60%',
                data:[10, 52, 200,300,400]
            }
        ]
    };
    ;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
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
            x: 130,
            y: 25,
            text: '刀具健康预测',
        },
        grid: {containLabel: true},
        xAxis: {name: 'H'},
        yAxis: {type: 'category'},
        visualMap: {
            orient: 'horizontal',
            left: 'center',
            min: 10,
            max: 100,
            text: ['损坏', '健康'],
            // Map the score column to color
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
                    x: 'amount',
                    // Map the "product" column to Y axis
                    y: 'product'
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


function count() {

        alter("hi");

}