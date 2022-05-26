function history_rate() {
    var dom = document.getElementById("pie1");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    option = {
        title : {
            text: '历史合格率',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series : [
            {
                name: '品质',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:1, name:'优秀'},
                    {value:1, name:'一般'},
                    {value:3, name:'垃圾'},
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


function current_rate() {
    var dom = document.getElementById("pie2");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    option = {
        title : {
            text: '当前合格率',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series : [
            {
                name: '品质',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:1, name:'优秀'},
                    {value:1, name:'一般'},
                    {value:3, name:'垃圾'},
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

