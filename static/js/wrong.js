function show_charts() {
    var dom = document.getElementById("wrong_charts");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    app.title = '数控车床历史电耗';

    option = {

        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        title: {
            text: ' ',


        },
        legend: [

            {
            data: ['功率过高', '功率过低','部件损坏','断刀','刀具磨损']
        }
        ],

        grid: [{
            left: '3%',
            right: '50%',
            bottom: '3%',
            containLabel: true,

        },
               {left: '53%',
                right: '5%',
                bottom: '3%',
                containLabel: true,}
        ],
        xAxis : [
            {
                gridIndex: 0,
                type : 'category',

                data : ['1月', '2月', '3月', '4月', '5月', '6月','7月', '8月', '9月', '10月', '11月', '12月'],
                axisTick: {
                    alignWithLabel: true
                }

            },
            {
                name:'次数',
                gridIndex: 1,
                type: 'value'
            }
        ],
        yAxis : [
            {
                gridIndex: 0,
                type : 'value',
                name:'次数',
                axisLabel: {
                    formatter: '{value} '
                }
            },
            {
                gridIndex: 1,
                type: 'category',

                data: ['数控铣','数控车','激光切','摇臂钻','台钻','普铣','普车']
            }
        ],
        series : [
            {
                name:'次数',
                type:'bar',
                xAxisIndex: 0,
                yAxisIndex: 0,
                barWidth: '60%',
                data:[1, 0, 3, 2, 1, 3, 2,2, 0, 0, 0, 0],
                color: ['#3398DB']
            },

            {
                name: '功率过高',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                stack: '总量',
                label: {
                    normal: {
                        show: false,
                        position: 'insideRight'
                    }
                },
                data: [2, 0, 2, 0, 2, 1, 1]
            },

            {
                name: '功率过低',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                stack: '总量',
                label: {
                    normal: {
                        show: false,
                        position: 'insideRight'
                    }
                },
                data: [1, 2, 1, 0, 1, 1, 2]
            },

            {
                name: '部件损坏',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                stack: '总量',
                label: {
                    normal: {
                        show: false,
                        position: 'insideRight'
                    }
                },
                data: [0, 1, 1, 1, 2, 0, 0]
            },

            {
                name: '断刀',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                stack: '总量',
                label: {
                    normal: {
                        show: false,
                        position: 'insideRight'
                    }
                },
                data: [1, 1, 0, 1, 1, 0, 0]
            },

            {
                name: '刀具磨损',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                stack: '总量',
                label: {
                    normal: {
                        show: false,
                        position: 'insideRight'
                    }
                },
                data: [1, 1, 0, 2, 2, 0, 2]
            }

        ]
    };
    ;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}

