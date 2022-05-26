function show_charts() {
    var dom = document.getElementById("wrong_charts");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    app.title = '订单';

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
                gridIndex: 1,
                type : 'category',

                data : ['数控铣','数控车','激光切','摇臂钻','台钻','普铣','普车'],
                axisTick: {
                    alignWithLabel: true
                }

            },
        ],
        yAxis : [
            {
                gridIndex: 0,
                type : 'value',
                name:'订单数',
                axisLabel: {
                    formatter: '{value} '
                }
            },
            {
                gridIndex: 1,
                type : 'value',
                name:'订单数',
                axisLabel: {
                    formatter: '{value} '
                }
            },
        ],
        series : [
            {
                name:'次数',
                type:'bar',
                xAxisIndex: 0,
                yAxisIndex: 0,
                barWidth: '60%',
                data:[7, 3, 8, 6, 9, 8, 7,8, 4, 8, 3, 5],
                color: ['#3398DB']
            },
            {
                name:'订单数',
                type:'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                barWidth: '60%',
                data:[1, 1, 3, 2, 1, 3,1],
                color: ['#db3e44']
            },









        ]
    };
    ;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}