
function showU(){

    var dom = document.getElementById("e_charts");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    function randomData() {
        now = new Date();
        value = base + Math.random() * 10;
        return {
            name: now.toString(),
            value: [
                now,
                value
            ]
        }
    }

    function randomUa() {
        now = new Date();
        value = ua;
        return {
            name: now.toString(),
            value: [
                now,
                value
            ]
        }
    }

    function randomUb() {
        now = new Date();
        value = ub;
        return {
            name: now.toString(),
            value: [
                now,
                value
            ]
        }
    }


    function randomUc() {
        now = new Date();
        value = uc;
        return {
            name: now.toString(),
            value: [
                now,
                value
            ]
        }
    }


    function randomData2(str_time,value) {
        now = new Date(str_time);
        return {
            name: now.toString(),
            value: [
                now,
                value
            ]
        }
    }

    var data1 = [];
    var data2=[];
    var data3=[];
    var now = +new Date(1997, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var base=220;
    var value = 230;

    $.get("/e2/LastN",function(data){

            for (var i=0;i<20;i++){
            data1.push(randomData2(data['Data'][i]['time'],data['Data'][i]['ua']));
            data2.push(randomData2(data['Data'][i]['time'],data['Data'][i]['ub']));
            data3.push(randomData2(data['Data'][i]['time'],data['Data'][i]['uc']));
            }

});


    /*
    for (var i = 0; i < 10; i++) {
        data1.push(randomData());
        data2.push(randomData());
        data3.push(randomData());
    }
*/
    option = {
        title: {
            text: '三相电压'
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
        grid: [{
            left: '0%',
            right: '70%',
            bottom: '3%',
            containLabel: true,

        },
            {left: '32%',
                right: '32%',
                bottom: '3%',
                containLabel: true,},
            {left: '70%',
                right: '2%',
                bottom: '3%',
                containLabel: true,}
        ],
        xAxis: [{
            gridIndex: 0,
            type: 'time',
            splitLine: {
                show: false
            }
        },
            {
                gridIndex: 1,
                type: 'time',
                splitLine: {
                    show: false
                }
            },
            {
                gridIndex: 2,
                type: 'time',
                splitLine: {
                    show: false
                }
            }
        ],
        yAxis: [{
            name: 'A',
            gridIndex: 0,
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            },
            axisLabel: {
                formatter: '{value} V'
            },
            max:function(value) {
	return (value.max +3).toFixed(0);
	},
            min:function(value) {
	return (value.min - 3).toFixed(0);
	},
        },
            {
                name: 'B',
                gridIndex: 1,
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: '{value} V'
                },
                max:function(value) {
	return (value.max +3).toFixed(0);
	},
                min:function(value) {
	return (value.min - 3).toFixed(0);
	},
            },
            {
                name: 'C',
                gridIndex: 2,
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: '{value} V'
                },
                max:function(value) {
	return (value.max +3).toFixed(0)
	},
                min:function(value) {
	return (value.min - 3).toFixed(0);
	},
            }
        ],
        series: [{
            xAxisIndex: 0,
            yAxisIndex: 0,

            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data1,
            color: ['#3398DB']
        },

            {
                xAxisIndex: 1,
                yAxisIndex: 1,

                name: '模拟数据',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: data2,
                color: ['#3398DB']
            },

            {
                xAxisIndex: 2,
                yAxisIndex: 2,

                name: '模拟数据',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: data3,
                color: ['#3398DB']
            }
        ]
    };

var ua=0;
var ub=0;
var uc=0;
var Dtime = new Date();
var num=0;
var stats={};



function T(){
$.get("/e2/U",{'index':num},function(data){

            if(data['flag']==1){
            num=data['index'];
            ua=data['ua'];
            ub=data['ub'];
            uc=data['uc'];
            Dtime=new Date(data['time']);

            }

});}

    setInterval(function () {


            $.get("/e2/U",{'index':num},function(data){

            if(data['flag']==1){
            num=data['index'];
            ua=data['ua'];
            ub=data['ub'];
            uc=data['uc'];
            Dtime=new Date(data['time']);
            stats=data['stats'];
            var t = document.getElementById("table-7");
            t.rows[1].cells[1].innerHTML=Math.round(stats['max_ua']*10)/10;
            t.rows[1].cells[2].innerHTML=Math.round(stats['min_ua']*10)/10;
            t.rows[1].cells[3].innerHTML=Math.round(stats['avg_ua']*10)/10;
            t.rows[1].cells[4].innerHTML=Math.round(stats['max_ub']*10)/10;
            t.rows[1].cells[5].innerHTML=Math.round(stats['min_ub']*10)/10;
            t.rows[1].cells[6].innerHTML=Math.round(stats['avg_ub']*10)/10;
            t.rows[1].cells[7].innerHTML=Math.round(stats['max_uc']*10)/10;
            t.rows[1].cells[8].innerHTML=Math.round(stats['min_uc']*10)/10;
            t.rows[1].cells[9].innerHTML=Math.round(stats['avg_uc']*10)/10;
            t.rows[2].cells[1].innerHTML=Math.round(stats['max_ia']*10)/10;
            t.rows[2].cells[2].innerHTML=Math.round(stats['min_ia']*10)/10;
            t.rows[2].cells[3].innerHTML=Math.round(stats['avg_ia']*10)/10;
            t.rows[2].cells[4].innerHTML=Math.round(stats['max_ib']*10)/10;
            t.rows[2].cells[5].innerHTML=Math.round(stats['min_ib']*10)/10;
            t.rows[2].cells[6].innerHTML=Math.round(stats['avg_ib']*10)/10;
            t.rows[2].cells[7].innerHTML=Math.round(stats['max_ic']*10)/10;
            t.rows[2].cells[8].innerHTML=Math.round(stats['min_ic']*10)/10;
            t.rows[2].cells[9].innerHTML=Math.round(stats['avg_ic']*10)/10;
            t.rows[3].cells[1].innerHTML=Math.round(stats['max_Pa']*10)/10;
            t.rows[3].cells[2].innerHTML=Math.round(stats['min_Pa']*10)/10;
            t.rows[3].cells[3].innerHTML=Math.round(stats['avg_Pa']*10)/10;
            t.rows[3].cells[4].innerHTML=Math.round(stats['max_Pb']*10)/10;
            t.rows[3].cells[5].innerHTML=Math.round(stats['min_Pb']*10)/10;
            t.rows[3].cells[6].innerHTML=Math.round(stats['avg_Pb']*10)/10;
            t.rows[3].cells[7].innerHTML=Math.round(stats['max_Pc']*10)/10;
            t.rows[3].cells[8].innerHTML=Math.round(stats['min_Pc']*10)/10;
            t.rows[3].cells[9].innerHTML=Math.round(stats['avg_Pc']*10)/10;
            t.rows[4].cells[1].innerHTML=Math.round(stats['max_PFa']*10)/10;
            t.rows[4].cells[2].innerHTML=Math.round(stats['min_PFa']*10)/10;
            t.rows[4].cells[3].innerHTML=Math.round(stats['avg_PFa']*10)/10;
            t.rows[4].cells[4].innerHTML=Math.round(stats['max_PFb']*10)/10;
            t.rows[4].cells[5].innerHTML=Math.round(stats['min_PFb']*10)/10;
            t.rows[4].cells[6].innerHTML=Math.round(stats['avg_PFb']*10)/10;
            t.rows[4].cells[7].innerHTML=Math.round(stats['max_PFc']*10)/10;
            t.rows[4].cells[8].innerHTML=Math.round(stats['min_PFc']*10)/10;
            t.rows[4].cells[9].innerHTML=Math.round(stats['avg_PFc']*10)/10;
            t.rows[5].cells[1].innerHTML=Math.round(stats['max_Sa']*10)/10;
            t.rows[5].cells[2].innerHTML=Math.round(stats['min_Sa']*10)/10;
            t.rows[5].cells[3].innerHTML=Math.round(stats['avg_Sa']*10)/10;
            t.rows[5].cells[4].innerHTML=Math.round(stats['max_Sb']*10)/10;
            t.rows[5].cells[5].innerHTML=Math.round(stats['min_Sb']*10)/10;
            t.rows[5].cells[6].innerHTML=Math.round(stats['avg_Sb']*10)/10;
            t.rows[5].cells[7].innerHTML=Math.round(stats['max_Sc']*10)/10;
            t.rows[5].cells[8].innerHTML=Math.round(stats['min_Sc']*10)/10;
            t.rows[5].cells[9].innerHTML=Math.round(stats['avg_Sc']*10)/10;
            data1.shift();
            data2.shift();
            data3.shift();
			data1.push(randomData2(Dtime,ua));
			data2.push(randomData2(Dtime,ub));
			data3.push(randomData2(Dtime,uc));



            }

});



        myChart.setOption({
            series: [{
                xAxisIndex: 0,
                yAxisIndex: 0,
                data: data1
            },
                {
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: data2
                },
                {
                    xAxisIndex: 2,
                    yAxisIndex: 2,
                    data: data3
                }
            ]
        });
    }, 500);;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}


function showI() {
    var dom = document.getElementById("e_charts");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    function randomData() {
        now = new Date();
        value = base + Math.random() * 0.1;
        return {
            name: now.toString(),
            value: [
                now,
                value
            ]
        }
    }

    function randomia() {
        now = new Date();
        value = ia;
        return {
            name: now.toString(),
            value: [
                now,
                value
            ]
        }
    }

    function randomib() {
        now = new Date();
        value = ib;
        return {
            name: now.toString(),
            value: [
                now,
                value
            ]
        }
    }

    function randomic() {
        now = new Date();
        value = ic;
        return {
            name: now.toString(),
            value: [
                now,
                value
            ]
        }
    }

    function randomic() {
        now = new Date();
        value = ic;
        return {
            name: now.toString(),
            value: [
                now,
                value
            ]
        }
    }

    function randomData2(str_time,value) {
        now = new Date(str_time);
        return {
            name: now.toString(),
            value: [
                now,
                value
            ]
        }
    }

    var data1 = [];
    var data2=[];
    var data3=[];
    var now = +new Date(1997, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var base=1;
    var value = 230;

    $.get("/e2/LastN",function(data){

            for (var i=0;i<20;i++){
            data1.push(randomData2(data['Data'][i]['time'],data['Data'][i]['ia']));
            data2.push(randomData2(data['Data'][i]['time'],data['Data'][i]['ib']));
            data3.push(randomData2(data['Data'][i]['time'],data['Data'][i]['ic']));
            }

});

    /*
    for (var i = 0; i < 10; i++) {
        data1.push(randomData());
        data2.push(randomData());
        data3.push(randomData());
    }
*/
    option = {
        title: {
            text: '三相电流'
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
        grid: [{
            left: '0%',
            right: '70%',
            bottom: '3%',
            containLabel: true,

        },
            {left: '32%',
                right: '32%',
                bottom: '3%',
                containLabel: true,},
            {left: '70%',
                right: '2%',
                bottom: '3%',
                containLabel: true,}
        ],
        xAxis: [{
            gridIndex: 0,
            type: 'time',
            splitLine: {
                show: false
            }
        },
            {
                gridIndex: 1,
                type: 'time',
                splitLine: {
                    show: false
                }
            },
            {
                gridIndex: 2,
                type: 'time',
                splitLine: {
                    show: false
                }
            }
        ],
        yAxis: [{
            name: 'A',
            gridIndex: 0,
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            },
            axisLabel: {
                formatter: '{value} A'
            },
            max:function(value) {
	return (value.max +0.5).toFixed(1);
	},
            min:function(value) {
	return (value.min -0.5).toFixed(1);
	},
        },
            {
                name: 'B',
                gridIndex: 1,
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: '{value} A'
                },
                max:function(value) {
	return (value.max +0.5).toFixed(1);
	},
                min:function(value) {
	return (value.min -0.5).toFixed(1);
	},
            },
            {
                name: 'C',
                gridIndex: 2,
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: '{value} A'
                },
                max:function(value) {
	return (value.max +0.5).toFixed(1);
	},
                min:function(value) {
	return (value.min -0.5).toFixed(1);
	},
            }
        ],
        series: [{
            xAxisIndex: 0,
            yAxisIndex: 0,

            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data1,
            color: ['#3398DB']
        },

            {
                xAxisIndex: 1,
                yAxisIndex: 1,

                name: '模拟数据',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: data2,
                color: ['#3398DB']
            },

            {
                xAxisIndex: 2,
                yAxisIndex: 2,

                name: '模拟数据',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: data3,
                color: ['#3398DB']
            }
        ]
    };

var ia=0;
var ib=0;
var ic=0;
var Dtime = new Date();
var num=0;
var stats={};

    setInterval(function () {


    $.get("/e2/Idata",{'index':num},function(data){

            if(data['flag']==1){
            num=data['index'];
            ia=data['ia'];
            ib=data['ib'];
            ic=data['ic'];
            Dtime=new Date(data['time']);
            stats=data['stats'];
            var t = document.getElementById("table-7");
            t.rows[1].cells[1].innerHTML=Math.round(stats['max_ua']*10)/10;
            t.rows[1].cells[2].innerHTML=Math.round(stats['min_ua']*10)/10;
            t.rows[1].cells[3].innerHTML=Math.round(stats['avg_ua']*10)/10;
            t.rows[1].cells[4].innerHTML=Math.round(stats['max_ub']*10)/10;
            t.rows[1].cells[5].innerHTML=Math.round(stats['min_ub']*10)/10;
            t.rows[1].cells[6].innerHTML=Math.round(stats['avg_ub']*10)/10;
            t.rows[1].cells[7].innerHTML=Math.round(stats['max_uc']*10)/10;
            t.rows[1].cells[8].innerHTML=Math.round(stats['min_uc']*10)/10;
            t.rows[1].cells[9].innerHTML=Math.round(stats['avg_uc']*10)/10;
            t.rows[2].cells[1].innerHTML=Math.round(stats['max_ia']*10)/10;
            t.rows[2].cells[2].innerHTML=Math.round(stats['min_ia']*10)/10;
            t.rows[2].cells[3].innerHTML=Math.round(stats['avg_ia']*10)/10;
            t.rows[2].cells[4].innerHTML=Math.round(stats['max_ib']*10)/10;
            t.rows[2].cells[5].innerHTML=Math.round(stats['min_ib']*10)/10;
            t.rows[2].cells[6].innerHTML=Math.round(stats['avg_ib']*10)/10;
            t.rows[2].cells[7].innerHTML=Math.round(stats['max_ic']*10)/10;
            t.rows[2].cells[8].innerHTML=Math.round(stats['min_ic']*10)/10;
            t.rows[2].cells[9].innerHTML=Math.round(stats['avg_ic']*10)/10;
            t.rows[3].cells[1].innerHTML=Math.round(stats['max_Pa']*10)/10;
            t.rows[3].cells[2].innerHTML=Math.round(stats['min_Pa']*10)/10;
            t.rows[3].cells[3].innerHTML=Math.round(stats['avg_Pa']*10)/10;
            t.rows[3].cells[4].innerHTML=Math.round(stats['max_Pb']*10)/10;
            t.rows[3].cells[5].innerHTML=Math.round(stats['min_Pb']*10)/10;
            t.rows[3].cells[6].innerHTML=Math.round(stats['avg_Pb']*10)/10;
            t.rows[3].cells[7].innerHTML=Math.round(stats['max_Pc']*10)/10;
            t.rows[3].cells[8].innerHTML=Math.round(stats['min_Pc']*10)/10;
            t.rows[3].cells[9].innerHTML=Math.round(stats['avg_Pc']*10)/10;
            t.rows[4].cells[1].innerHTML=Math.round(stats['max_PFa']*10)/10;
            t.rows[4].cells[2].innerHTML=Math.round(stats['min_PFa']*10)/10;
            t.rows[4].cells[3].innerHTML=Math.round(stats['avg_PFa']*10)/10;
            t.rows[4].cells[4].innerHTML=Math.round(stats['max_PFb']*10)/10;
            t.rows[4].cells[5].innerHTML=Math.round(stats['min_PFb']*10)/10;
            t.rows[4].cells[6].innerHTML=Math.round(stats['avg_PFb']*10)/10;
            t.rows[4].cells[7].innerHTML=Math.round(stats['max_PFc']*10)/10;
            t.rows[4].cells[8].innerHTML=Math.round(stats['min_PFc']*10)/10;
            t.rows[4].cells[9].innerHTML=Math.round(stats['avg_PFc']*10)/10;
            t.rows[5].cells[1].innerHTML=Math.round(stats['max_Sa']*10)/10;
            t.rows[5].cells[2].innerHTML=Math.round(stats['min_Sa']*10)/10;
            t.rows[5].cells[3].innerHTML=Math.round(stats['avg_Sa']*10)/10;
            t.rows[5].cells[4].innerHTML=Math.round(stats['max_Sb']*10)/10;
            t.rows[5].cells[5].innerHTML=Math.round(stats['min_Sb']*10)/10;
            t.rows[5].cells[6].innerHTML=Math.round(stats['avg_Sb']*10)/10;
            t.rows[5].cells[7].innerHTML=Math.round(stats['max_Sc']*10)/10;
            t.rows[5].cells[8].innerHTML=Math.round(stats['min_Sc']*10)/10;
            t.rows[5].cells[9].innerHTML=Math.round(stats['avg_Sc']*10)/10;
            data1.shift();
            data2.shift();
            data3.shift();
			data1.push(randomData2(Dtime,ia));
			data2.push(randomData2(Dtime,ib));
			data3.push(randomData2(Dtime,ic));
            }

});




        myChart.setOption({
            series: [{
                xAxisIndex: 0,
                yAxisIndex: 0,
                data: data1
            },
                {
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: data2
                },
                {
                    xAxisIndex: 2,
                    yAxisIndex: 2,
                    data: data3
                }
            ]
        });
    }, 500);;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}


function showPh() {

    var dom = document.getElementById("e_charts");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    function randomData() {
        now = new Date();
        value = 0;
        return {
            name: now.toString(),
            value: [
                now,
                value
            ]
        }
    }

    function randomPa() {
        now = new Date();
        value = Pa;
        return {
            name: now.toString(),
            value: [
                now,
                value
            ]
        }
    }

    function randomPb() {
        now = new Date();
        value = Pb;
        return {
            name: now.toString(),
            value: [
                now,
                value
            ]
        }
    }

    function randomPc() {
        now = new Date();
        value = Pc;
        return {
            name: now.toString(),
            value: [
                now,
                value
            ]
        }
    }

    function randomData2(str_time,value) {
        now = new Date(str_time);
        return {
            name: now.toString(),
            value: [
                now,
                value
            ]
        }
    }

    var data1 = [];
    var data2=[];
    var data3=[];
    var now = +new Date(1997, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var base=1;
    var value = 200;

     $.get("/e2/LastN",function(data){

            for (var i=0;i<20;i++){
            data1.push(randomData2(data['Data'][i]['time'],data['Data'][i]['Pa']));
            data2.push(randomData2(data['Data'][i]['time'],data['Data'][i]['Pb']));
            data3.push(randomData2(data['Data'][i]['time'],data['Data'][i]['Pc']));
            }

});

    /*
    for (var i = 0; i < 1000; i++) {
        data1.push(randomData());
        data2.push(randomData());
        data3.push(randomData());
    }
*/

    option = {
        title: {
            text: '三相有功功率'
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
        grid: [{
            left: '0%',
            right: '70%',
            bottom: '3%',
            containLabel: true,

        },
            {left: '32%',
                right: '32%',
                bottom: '3%',
                containLabel: true,},
            {left: '70%',
                right: '2%',
                bottom: '3%',
                containLabel: true,}
        ],
        xAxis: [{
            gridIndex: 0,
            type: 'time',
            splitLine: {
                show: false
            }
        },
            {
                gridIndex: 1,
                type: 'time',
                splitLine: {
                    show: false
                }
            },
            {
                gridIndex: 2,
                type: 'time',
                splitLine: {
                    show: false
                }
            }
        ],
        yAxis: [{
            name: 'A',
            gridIndex: 0,
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            },
            axisLabel: {
                formatter: '{value} W'
            },
            max:function(value) {
	return (value.max +3).toFixed(0);
	},
	        min:function(value) {
	return (value.min -3).toFixed(0);
	},
        },
            {
                name: 'B',
                gridIndex: 1,
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: '{value} W'
                },
                max:function(value) {
	return (value.max +3).toFixed(0);
	},
	            min:function(value) {
	return (value.min -3).toFixed(0);
	},
            },
            {
                name: 'C',
                gridIndex: 2,
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: '{value} W'
                },
                max:function(value) {
	return (value.max +3).toFixed(0);
	},
	            min:function(value) {
	return (value.min -3).toFixed(0);
	},
            }
        ],
        series: [{
            xAxisIndex: 0,
            yAxisIndex: 0,

            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data1,
            color: ['#3398DB']
        },

            {
                xAxisIndex: 1,
                yAxisIndex: 1,

                name: '模拟数据',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: data2,
                color: ['#3398DB']
            },

            {
                xAxisIndex: 2,
                yAxisIndex: 2,

                name: '模拟数据',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: data3,
                color: ['#3398DB']
            }
        ]
    };

var Pa=0;
var Pb=0;
var Pc=0;
var Dtime = new Date();
var num=0;
var stats={};


    setInterval(function () {

        $.get("/e2/Pdata",{'index':num},function(data){

            if(data['flag']==1){
            num=data['index'];
            Pa=data['Pa'];
            Pb=data['Pb'];
            Pc=data['Pc'];
            Dtime=new Date(data['time']);
            stats=data['stats'];
            var t = document.getElementById("table-7");
            t.rows[1].cells[1].innerHTML=Math.round(stats['max_ua']*10)/10;
            t.rows[1].cells[2].innerHTML=Math.round(stats['min_ua']*10)/10;
            t.rows[1].cells[3].innerHTML=Math.round(stats['avg_ua']*10)/10;
            t.rows[1].cells[4].innerHTML=Math.round(stats['max_ub']*10)/10;
            t.rows[1].cells[5].innerHTML=Math.round(stats['min_ub']*10)/10;
            t.rows[1].cells[6].innerHTML=Math.round(stats['avg_ub']*10)/10;
            t.rows[1].cells[7].innerHTML=Math.round(stats['max_uc']*10)/10;
            t.rows[1].cells[8].innerHTML=Math.round(stats['min_uc']*10)/10;
            t.rows[1].cells[9].innerHTML=Math.round(stats['avg_uc']*10)/10;
            t.rows[2].cells[1].innerHTML=Math.round(stats['max_ia']*10)/10;
            t.rows[2].cells[2].innerHTML=Math.round(stats['min_ia']*10)/10;
            t.rows[2].cells[3].innerHTML=Math.round(stats['avg_ia']*10)/10;
            t.rows[2].cells[4].innerHTML=Math.round(stats['max_ib']*10)/10;
            t.rows[2].cells[5].innerHTML=Math.round(stats['min_ib']*10)/10;
            t.rows[2].cells[6].innerHTML=Math.round(stats['avg_ib']*10)/10;
            t.rows[2].cells[7].innerHTML=Math.round(stats['max_ic']*10)/10;
            t.rows[2].cells[8].innerHTML=Math.round(stats['min_ic']*10)/10;
            t.rows[2].cells[9].innerHTML=Math.round(stats['avg_ic']*10)/10;
            t.rows[3].cells[1].innerHTML=Math.round(stats['max_Pa']*10)/10;
            t.rows[3].cells[2].innerHTML=Math.round(stats['min_Pa']*10)/10;
            t.rows[3].cells[3].innerHTML=Math.round(stats['avg_Pa']*10)/10;
            t.rows[3].cells[4].innerHTML=Math.round(stats['max_Pb']*10)/10;
            t.rows[3].cells[5].innerHTML=Math.round(stats['min_Pb']*10)/10;
            t.rows[3].cells[6].innerHTML=Math.round(stats['avg_Pb']*10)/10;
            t.rows[3].cells[7].innerHTML=Math.round(stats['max_Pc']*10)/10;
            t.rows[3].cells[8].innerHTML=Math.round(stats['min_Pc']*10)/10;
            t.rows[3].cells[9].innerHTML=Math.round(stats['avg_Pc']*10)/10;
            t.rows[4].cells[1].innerHTML=Math.round(stats['max_PFa']*10)/10;
            t.rows[4].cells[2].innerHTML=Math.round(stats['min_PFa']*10)/10;
            t.rows[4].cells[3].innerHTML=Math.round(stats['avg_PFa']*10)/10;
            t.rows[4].cells[4].innerHTML=Math.round(stats['max_PFb']*10)/10;
            t.rows[4].cells[5].innerHTML=Math.round(stats['min_PFb']*10)/10;
            t.rows[4].cells[6].innerHTML=Math.round(stats['avg_PFb']*10)/10;
            t.rows[4].cells[7].innerHTML=Math.round(stats['max_PFc']*10)/10;
            t.rows[4].cells[8].innerHTML=Math.round(stats['min_PFc']*10)/10;
            t.rows[4].cells[9].innerHTML=Math.round(stats['avg_PFc']*10)/10;
            t.rows[5].cells[1].innerHTML=Math.round(stats['max_Sa']*10)/10;
            t.rows[5].cells[2].innerHTML=Math.round(stats['min_Sa']*10)/10;
            t.rows[5].cells[3].innerHTML=Math.round(stats['avg_Sa']*10)/10;
            t.rows[5].cells[4].innerHTML=Math.round(stats['max_Sb']*10)/10;
            t.rows[5].cells[5].innerHTML=Math.round(stats['min_Sb']*10)/10;
            t.rows[5].cells[6].innerHTML=Math.round(stats['avg_Sb']*10)/10;
            t.rows[5].cells[7].innerHTML=Math.round(stats['max_Sc']*10)/10;
            t.rows[5].cells[8].innerHTML=Math.round(stats['min_Sc']*10)/10;
            t.rows[5].cells[9].innerHTML=Math.round(stats['avg_Sc']*10)/10;
            data1.shift();
            data2.shift();
            data3.shift();
			data1.push(randomData2(Dtime,Pa));
			data2.push(randomData2(Dtime,Pb));
			data3.push(randomData2(Dtime,Pc));

            }

});

        myChart.setOption({
            series: [{
                xAxisIndex: 0,
                yAxisIndex: 0,
                data: data1
            },
                {
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: data2
                },
                {
                    xAxisIndex: 2,
                    yAxisIndex: 2,
                    data: data3
                }
            ]
        });
    }, 500);;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }

}


function showPs() {

    var dom = document.getElementById("e_charts");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    function randomData() {
        now = new Date();
        value = 0;
        return {
            name: now.toString(),
            value: [
                now,
                value
            ]
        }
    }

    function randomPFa() {
        now = new Date();
        value = PFa;
        return {
            name: now.toString(),
            value: [
                now,
                value
            ]
        }
    }

    function randomPFb() {
        now = new Date();
        value = PFb;
        return {
            name: now.toString(),
            value: [
                now,
                value
            ]
        }
    }

    function randomPFc() {
        now = new Date();
        value = PFc;
        return {
            name: now.toString(),
            value: [
                now,
                value
            ]
        }
    }

    function randomData2(str_time,value) {
        now = new Date(str_time);
        return {
            name: now.toString(),
            value: [
                now,
                value
            ]
        }
    }

    var data1 = [];
    var data2=[];
    var data3=[];
    var now = +new Date(1997, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var base=1;
    var value = 200;

    $.get("/e2/LastN",function(data){

            for (var i=0;i<20;i++){
            data1.push(randomData2(data['Data'][i]['time'],data['Data'][i]['PFa']));
            data2.push(randomData2(data['Data'][i]['time'],data['Data'][i]['PFb']));
            data3.push(randomData2(data['Data'][i]['time'],data['Data'][i]['PFc']));
            }

});

    /*
    for (var i = 0; i < 10; i++) {
        data1.push(randomData());
        data2.push(randomData());
        data3.push(randomData());
    }
*/

    option = {
        title: {
            text: '三相视在功率'
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
        grid: [{
            left: '0%',
            right: '70%',
            bottom: '3%',
            containLabel: true,

        },
            {left: '32%',
                right: '32%',
                bottom: '3%',
                containLabel: true,},
            {left: '70%',
                right: '2%',
                bottom: '3%',
                containLabel: true,}
        ],
        xAxis: [{
            gridIndex: 0,
            type: 'time',
            splitLine: {
                show: false
            }
        },
            {
                gridIndex: 1,
                type: 'time',
                splitLine: {
                    show: false
                }
            },
            {
                gridIndex: 2,
                type: 'time',
                splitLine: {
                    show: false
                }
            }
        ],
        yAxis: [{
            name: 'A',
            gridIndex: 0,
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            },
            axisLabel: {
                formatter: '{value} W'
            },
            max:function(value) {
	return (value.max +3).toFixed(0);
	},
            min:function(value) {
	return (value.min -3).toFixed(0);
	},
        },
            {
                name: 'B',
                gridIndex: 1,
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: '{value} W'
                },
                max:function(value) {
	return (value.max +3).toFixed(0);
	},
                min:function(value) {
	return (value.min -3).toFixed(0);
	}
            },
            {
                name: 'C',
                gridIndex: 2,
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: '{value} W'
                },
                max:function(value) {
	return (value.max +3).toFixed(0);
	},
                min:function(value) {
	return (value.min -3).toFixed(0);
	},
            }
        ],
        series: [{
            xAxisIndex: 0,
            yAxisIndex: 0,

            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data1,
            color: ['#3398DB']
        },

            {
                xAxisIndex: 1,
                yAxisIndex: 1,

                name: '模拟数据',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: data2,
                color: ['#3398DB']
            },

            {
                xAxisIndex: 2,
                yAxisIndex: 2,

                name: '模拟数据',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: data3,
                color: ['#3398DB']
            }
        ]
    };

var PFa=0;
var PFb=0;
var PFc=0;
var Dtime = new Date();
var num=0;
var stats={};

    setInterval(function () {

        $.get("/e2/PFdata",{'index':num},function(data){

            if(data['flag']==1){
            num=data['index'];
            PFa=data['PFa'];
            PFb=data['PFb'];
            PFc=data['PFc'];
            Dtime=new Date(data['time']);
            stats=data['stats'];
            var t = document.getElementById("table-7");
            t.rows[1].cells[1].innerHTML=Math.round(stats['max_ua']*10)/10;
            t.rows[1].cells[2].innerHTML=Math.round(stats['min_ua']*10)/10;
            t.rows[1].cells[3].innerHTML=Math.round(stats['avg_ua']*10)/10;
            t.rows[1].cells[4].innerHTML=Math.round(stats['max_ub']*10)/10;
            t.rows[1].cells[5].innerHTML=Math.round(stats['min_ub']*10)/10;
            t.rows[1].cells[6].innerHTML=Math.round(stats['avg_ub']*10)/10;
            t.rows[1].cells[7].innerHTML=Math.round(stats['max_uc']*10)/10;
            t.rows[1].cells[8].innerHTML=Math.round(stats['min_uc']*10)/10;
            t.rows[1].cells[9].innerHTML=Math.round(stats['avg_uc']*10)/10;
            t.rows[2].cells[1].innerHTML=Math.round(stats['max_ia']*10)/10;
            t.rows[2].cells[2].innerHTML=Math.round(stats['min_ia']*10)/10;
            t.rows[2].cells[3].innerHTML=Math.round(stats['avg_ia']*10)/10;
            t.rows[2].cells[4].innerHTML=Math.round(stats['max_ib']*10)/10;
            t.rows[2].cells[5].innerHTML=Math.round(stats['min_ib']*10)/10;
            t.rows[2].cells[6].innerHTML=Math.round(stats['avg_ib']*10)/10;
            t.rows[2].cells[7].innerHTML=Math.round(stats['max_ic']*10)/10;
            t.rows[2].cells[8].innerHTML=Math.round(stats['min_ic']*10)/10;
            t.rows[2].cells[9].innerHTML=Math.round(stats['avg_ic']*10)/10;
            t.rows[3].cells[1].innerHTML=Math.round(stats['max_Pa']*10)/10;
            t.rows[3].cells[2].innerHTML=Math.round(stats['min_Pa']*10)/10;
            t.rows[3].cells[3].innerHTML=Math.round(stats['avg_Pa']*10)/10;
            t.rows[3].cells[4].innerHTML=Math.round(stats['max_Pb']*10)/10;
            t.rows[3].cells[5].innerHTML=Math.round(stats['min_Pb']*10)/10;
            t.rows[3].cells[6].innerHTML=Math.round(stats['avg_Pb']*10)/10;
            t.rows[3].cells[7].innerHTML=Math.round(stats['max_Pc']*10)/10;
            t.rows[3].cells[8].innerHTML=Math.round(stats['min_Pc']*10)/10;
            t.rows[3].cells[9].innerHTML=Math.round(stats['avg_Pc']*10)/10;
            t.rows[4].cells[1].innerHTML=Math.round(stats['max_PFa']*10)/10;
            t.rows[4].cells[2].innerHTML=Math.round(stats['min_PFa']*10)/10;
            t.rows[4].cells[3].innerHTML=Math.round(stats['avg_PFa']*10)/10;
            t.rows[4].cells[4].innerHTML=Math.round(stats['max_PFb']*10)/10;
            t.rows[4].cells[5].innerHTML=Math.round(stats['min_PFb']*10)/10;
            t.rows[4].cells[6].innerHTML=Math.round(stats['avg_PFb']*10)/10;
            t.rows[4].cells[7].innerHTML=Math.round(stats['max_PFc']*10)/10;
            t.rows[4].cells[8].innerHTML=Math.round(stats['min_PFc']*10)/10;
            t.rows[4].cells[9].innerHTML=Math.round(stats['avg_PFc']*10)/10;
            t.rows[5].cells[1].innerHTML=Math.round(stats['max_Sa']*10)/10;
            t.rows[5].cells[2].innerHTML=Math.round(stats['min_Sa']*10)/10;
            t.rows[5].cells[3].innerHTML=Math.round(stats['avg_Sa']*10)/10;
            t.rows[5].cells[4].innerHTML=Math.round(stats['max_Sb']*10)/10;
            t.rows[5].cells[5].innerHTML=Math.round(stats['min_Sb']*10)/10;
            t.rows[5].cells[6].innerHTML=Math.round(stats['avg_Sb']*10)/10;
            t.rows[5].cells[7].innerHTML=Math.round(stats['max_Sc']*10)/10;
            t.rows[5].cells[8].innerHTML=Math.round(stats['min_Sc']*10)/10;
            t.rows[5].cells[9].innerHTML=Math.round(stats['avg_Sc']*10)/10;
            data1.shift();
            data2.shift();
            data3.shift();
			data1.push(randomData2(Dtime,PFa));
			data2.push(randomData2(Dtime,PFb));
			data3.push(randomData2(Dtime,PFc));

            }

});


        myChart.setOption({
            series: [{
                xAxisIndex: 0,
                yAxisIndex: 0,
                data: data1
            },
                {
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: data2
                },
                {
                    xAxisIndex: 2,
                    yAxisIndex: 2,
                    data: data3
                }
            ]
        });
    }, 500);;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }

}

function showS() {

    var dom = document.getElementById("e_charts");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    function randomData() {
        now = new Date();
        value = 0;
        return {
            name: now.toString(),
            value: [
                now,
                value
            ]
        }
    }


    function randomSa() {
        now = new Date();
        value = Sa;
        return {
            name: now.toString(),
            value: [
                now,
                value
            ]
        }
    }

    function randomSb() {
        now = new Date();
        value = Sb;
        return {
            name: now.toString(),
            value: [
                now,
                value
            ]
        }
    }


    function randomSc() {
        now = new Date();
        value = Sc;
        return {
            name: now.toString(),
            value: [
                now,
                value
            ]
        }
    }

    function randomData2(str_time,value) {
        now = new Date(str_time);
        return {
            name: now.toString(),
            value: [
                now,
                value
            ]
        }
    }

    var data1 = [];
    var data2=[];
    var data3=[];
    var now = +new Date(1997, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var base=1;
    var value = 200;

     $.get("/e2/LastN",function(data){

            for (var i=0;i<20;i++){
            data1.push(randomData2(data['Data'][i]['time'],data['Data'][i]['Sa']));
            data2.push(randomData2(data['Data'][i]['time'],data['Data'][i]['Sb']));
            data3.push(randomData2(data['Data'][i]['time'],data['Data'][i]['Sc']));
            }

});
    /*
    for (var i = 0; i < 10; i++) {
        data1.push(randomData());
        data2.push(randomData());
        data3.push(randomData());
    }
*/


    option = {
        title: {
            text: '三相功率因素'
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
        grid: [{
            left: '0%',
            right: '70%',
            bottom: '3%',
            containLabel: true,

        },
            {left: '32%',
                right: '32%',
                bottom: '3%',
                containLabel: true,},
            {left: '70%',
                right: '2%',
                bottom: '3%',
                containLabel: true,}
        ],
        xAxis: [{
            gridIndex: 0,
            type: 'time',
            splitLine: {
                show: false
            }
        },
            {
                gridIndex: 1,
                type: 'time',
                splitLine: {
                    show: false
                }
            },
            {
                gridIndex: 2,
                type: 'time',
                splitLine: {
                    show: false
                }
            }
        ],
        yAxis: [{
            name: 'A',
            gridIndex: 0,
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            },
            axisLabel: {
                formatter: '{value} '
            },
            max:function(value) {
	return (value.max +0.1).toFixed(1);
	},
            min:0
        },
            {
                name: 'B',
                gridIndex: 1,
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: '{value} '
                },
                max:function(value) {
	return (value.max +0.1).toFixed(1);
	},
                min:function(value) {
	return 0;
	}
            },
            {
                name: 'C',
                gridIndex: 2,
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: '{value} '
                },
                max:function(value) {
	return (value.max +0.1).toFixed(1);
	},
                min:function(value) {
	return 0;
	},
            }
        ],
        series: [{
            xAxisIndex: 0,
            yAxisIndex: 0,

            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data1,
            color: ['#3398DB']
        },

            {
                xAxisIndex: 1,
                yAxisIndex: 1,

                name: '模拟数据',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: data2,
                color: ['#3398DB']
            },

            {
                xAxisIndex: 2,
                yAxisIndex: 2,

                name: '模拟数据',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: data3,
                color: ['#3398DB']
            }
        ]
    };

var Sa=0;
var Sb=0;
var Sc=0;
var Dtime = new Date();
var num=0;
var stats={};

    setInterval(function () {


        $.get("/e2/Sdata",{'index':num},function(data){

            if(data['flag']===1){
            num=data['index'];
            Sa=data['Sa'];
            Sb=data['Sb'];
            Sc=data['Sc'];
            Dtime=new Date(data['time']);
            stats=data['stats'];
            var t = document.getElementById("table-7");
            t.rows[1].cells[1].innerHTML=Math.round(stats['max_ua']*10)/10;
            t.rows[1].cells[2].innerHTML=Math.round(stats['min_ua']*10)/10;
            t.rows[1].cells[3].innerHTML=Math.round(stats['avg_ua']*10)/10;
            t.rows[1].cells[4].innerHTML=Math.round(stats['max_ub']*10)/10;
            t.rows[1].cells[5].innerHTML=Math.round(stats['min_ub']*10)/10;
            t.rows[1].cells[6].innerHTML=Math.round(stats['avg_ub']*10)/10;
            t.rows[1].cells[7].innerHTML=Math.round(stats['max_uc']*10)/10;
            t.rows[1].cells[8].innerHTML=Math.round(stats['min_uc']*10)/10;
            t.rows[1].cells[9].innerHTML=Math.round(stats['avg_uc']*10)/10;
            t.rows[2].cells[1].innerHTML=Math.round(stats['max_ia']*10)/10;
            t.rows[2].cells[2].innerHTML=Math.round(stats['min_ia']*10)/10;
            t.rows[2].cells[3].innerHTML=Math.round(stats['avg_ia']*10)/10;
            t.rows[2].cells[4].innerHTML=Math.round(stats['max_ib']*10)/10;
            t.rows[2].cells[5].innerHTML=Math.round(stats['min_ib']*10)/10;
            t.rows[2].cells[6].innerHTML=Math.round(stats['avg_ib']*10)/10;
            t.rows[2].cells[7].innerHTML=Math.round(stats['max_ic']*10)/10;
            t.rows[2].cells[8].innerHTML=Math.round(stats['min_ic']*10)/10;
            t.rows[2].cells[9].innerHTML=Math.round(stats['avg_ic']*10)/10;
            t.rows[3].cells[1].innerHTML=Math.round(stats['max_Pa']*10)/10;
            t.rows[3].cells[2].innerHTML=Math.round(stats['min_Pa']*10)/10;
            t.rows[3].cells[3].innerHTML=Math.round(stats['avg_Pa']*10)/10;
            t.rows[3].cells[4].innerHTML=Math.round(stats['max_Pb']*10)/10;
            t.rows[3].cells[5].innerHTML=Math.round(stats['min_Pb']*10)/10;
            t.rows[3].cells[6].innerHTML=Math.round(stats['avg_Pb']*10)/10;
            t.rows[3].cells[7].innerHTML=Math.round(stats['max_Pc']*10)/10;
            t.rows[3].cells[8].innerHTML=Math.round(stats['min_Pc']*10)/10;
            t.rows[3].cells[9].innerHTML=Math.round(stats['avg_Pc']*10)/10;
            t.rows[4].cells[1].innerHTML=Math.round(stats['max_PFa']*10)/10;
            t.rows[4].cells[2].innerHTML=Math.round(stats['min_PFa']*10)/10;
            t.rows[4].cells[3].innerHTML=Math.round(stats['avg_PFa']*10)/10;
            t.rows[4].cells[4].innerHTML=Math.round(stats['max_PFb']*10)/10;
            t.rows[4].cells[5].innerHTML=Math.round(stats['min_PFb']*10)/10;
            t.rows[4].cells[6].innerHTML=Math.round(stats['avg_PFb']*10)/10;
            t.rows[4].cells[7].innerHTML=Math.round(stats['max_PFc']*10)/10;
            t.rows[4].cells[8].innerHTML=Math.round(stats['min_PFc']*10)/10;
            t.rows[4].cells[9].innerHTML=Math.round(stats['avg_PFc']*10)/10;
            t.rows[5].cells[1].innerHTML=Math.round(stats['max_Sa']*10)/10;
            t.rows[5].cells[2].innerHTML=Math.round(stats['min_Sa']*10)/10;
            t.rows[5].cells[3].innerHTML=Math.round(stats['avg_Sa']*10)/10;
            t.rows[5].cells[4].innerHTML=Math.round(stats['max_Sb']*10)/10;
            t.rows[5].cells[5].innerHTML=Math.round(stats['min_Sb']*10)/10;
            t.rows[5].cells[6].innerHTML=Math.round(stats['avg_Sb']*10)/10;
            t.rows[5].cells[7].innerHTML=Math.round(stats['max_Sc']*10)/10;
            t.rows[5].cells[8].innerHTML=Math.round(stats['min_Sc']*10)/10;
            t.rows[5].cells[9].innerHTML=Math.round(stats['avg_Sc']*10)/10;
            data1.shift();
            data2.shift();
            data3.shift();
			data1.push(randomData2(Dtime,Sa));
			data2.push(randomData2(Dtime,Sb));
			data3.push(randomData2(Dtime,Sc));

            }

});

        myChart.setOption({
            series: [{
                xAxisIndex: 0,
                yAxisIndex: 0,
                data: data1
            },
                {
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: data2
                },
                {
                    xAxisIndex: 2,
                    yAxisIndex: 2,
                    data: data3
                }
            ]
        });
    }, 500);;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }

}