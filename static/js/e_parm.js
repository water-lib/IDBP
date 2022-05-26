//电流实时显示
function showI() {
    var dom = document.getElementById("I");
    var myChart = echarts.init(dom);
    var app = {};
    var index=1;
    var ua=0;
    var min=1000;
    var max=-1;
    var Dtime= new Date();
    option = null;

    function randomData() {

    now = new Date();

    return {
        name: now.toString(),
        value: [
            now,
            ua
        ]
    }
}


    function NowData() {
    now = new Date();

    return {
        name: now.toString(),
        value: [
            now,
            ua
        ]
    }
}
    var title_t='dd'
    var data = [];
    var now = +new Date(1997, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var value = Math.random() * 1000;
    for (var i = 0; i < 10; i++) {
        data.push(randomData());
    }

    option = {
        title: {
            x:150,
            y:0,
            text: '电流'

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
            },min: function(value) {
            if(value.min<min){
            min=value.min;
            document.getElementById("table IU").rows[1].cells[1].innerHTML=value.min;
            }
    return value.min - 0.001;

},

        max: function(value) {
        if(value.max>max){
        max=value.max;
        document.getElementById("table IU").rows[1].cells[2].innerHTML=value.max;
    }
        document.getElementById("table IU").rows[1].cells[3].innerHTML=(max+min)/2.0;
    return value.max + 0.001;
},
        },
        grid: {
        x: 50,
        y: 10,
        x2: 50,
        y2: 20,
    },
        series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data,
            title: {
            x: 0,
            y: 0,
            text: ua

        }
        }]
    };

function T(){
$.get("/e/I",{'index':index,'ua':ua},function(data){

            ua=data['ua'];
            Dtime=data['time'];
			index=index+1;



});}


setInterval(function () {

            T();


        data.shift();
        data.push(NowData());


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



function showU() {
    var dom = document.getElementById("U");
    var myChart = echarts.init(dom);
    var app = {};
    var index=1;
    var ua=0;
    var max=-1;
    var min=1000;

    var Dtime= new Date();
    option = null;

    function randomData() {

    now = new Date();

    return {
        name: now.toString(),
        value: [
            now,
            ua
        ]
    }
}


    function NowData() {
    now = new Date();

    return {
        name: now.toString(),
        value: [
            now,
            ua
        ]
    }
}
    var title_t='dd'
    var data = [];
    var now = +new Date(1997, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var value = Math.random() * 1000;
    for (var i = 0; i < 10; i++) {
        data.push(randomData());
    }

    option = {
        title: {
            x:150,
            y:0,
            text: '电压'

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
            },min: function(value) {
            if(value.min<min){
            min=value.min;
            document.getElementById("table IU").rows[2].cells[1].innerHTML=min;
            }
    return value.min - 0.001;
},

        max: function(value) {
        if(value.max>max){
        max=value.max;
        document.getElementById("table IU").rows[2].cells[2].innerHTML=max;
    }
        document.getElementById("table IU").rows[2].cells[3].innerHTML=(max+min)/2.0;
    return value.max + 0.001;
},
        },
        grid: {
        x: 50,
        y: 10,
        x2: 50,
        y2: 20,
    },
        series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data,
            title: {
            x: 0,
            y: 0,
            text: ua

        }
        }]
    };

function T(){
$.get("/e/U",{'index':index,'ua':ua},function(data){

            ua=data['ua'];
            Dtime=data['time'];
			index=index+1;



});}


setInterval(function () {

            T();


        data.shift();
        data.push(NowData());


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


function showPs() {
    var dom = document.getElementById("Ps");
    var myChart = echarts.init(dom);
    var app = {};
    var index=1;
    var ua=0;
    var max=-1;
    var min=1000;


    var Dtime= new Date();
    option = null;

    function randomData() {

    now = new Date();

    return {
        name: now.toString(),
        value: [
            now,
            ua
        ]
    }
}


    function NowData() {
    now = new Date();

    return {
        name: now.toString(),
        value: [
            now,
            ua
        ]
    }
}
    var title_t='dd'
    var data = [];
    var now = +new Date(1997, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var value = Math.random() * 1000;
    for (var i = 0; i < 10; i++) {
        data.push(randomData());
    }

    option = {
        title: {
            x:150,
            y:0,
            text: '有功功率'

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
            },min: function(value) {
            if(value.min<min){
            min=value.min;
            document.getElementById("table P").rows[1].cells[1].innerHTML=min;
            }
    return value.min - 1;
},

        max: function(value) {
        if(value.max>max){
        max=value.max;
        document.getElementById("table P").rows[1].cells[2].innerHTML=max;
    }
        document.getElementById("table P").rows[1].cells[3].innerHTML=(max+min)/2.0
    return value.max + 1;
},
        },
        grid: {
        x: 50,
        y: 10,
        x2: 50,
        y2: 20,
    },
        series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data,
            title: {
            x: 0,
            y: 0,
            text: ua

        }
        }]
    };

function T(){
$.get("/e/S",{'index':index,'ua':ua},function(data){

            ua=data['ua'];
            Dtime=data['time'];
			index=index+1;



});}


setInterval(function () {

            T();


        data.shift();
        data.push(NowData());


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

function showPh() {
    var dom = document.getElementById("Ph");
    var myChart = echarts.init(dom);
    var app = {};
    var index=1;
    var ua=0;
    var max=-1;
    var min=1000;

    var Dtime= new Date();
    option = null;

    function randomData() {

    now = new Date();

    return {
        name: now.toString(),
        value: [
            now,
            ua
        ]
    }
}


    function NowData() {
    now = new Date();

    return {
        name: now.toString(),
        value: [
            now,
            ua
        ]
    }
}
    var title_t='dd'
    var data = [];
    var now = +new Date(1997, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var value = Math.random() * 1000;
    for (var i = 0; i < 10; i++) {
        data.push(randomData());
    }

    option = {
        title: {
            x:150,
            y:0,
            text: '功率因子'

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
            },min: function(value) {
            if(value.min<min){
            min=value.min;
            document.getElementById("table P").rows[2].cells[1].innerHTML=min;
            }
    return value.min - 0.001;
},

        max: function(value) {
        if(value.max>max){
        max=value.max;
        document.getElementById("table P").rows[2].cells[2].innerHTML=max;
    }
        document.getElementById("table P").rows[2].cells[3].innerHTML=(max+min)/2.0
    return value.max + 0.001;
},
        },
        grid: {
        x: 50,
        y: 10,
        x2: 50,
        y2: 20,
    },
        series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data,
            title: {
            x: 0,
            y: 0,
            text: ua

        }
        }]
    };

function T(){
$.get("/e/PF",{'index':index,'ua':ua},function(data){

            ua=data['ua'];
            Dtime=data['time'];
			index=index+1;



});}


setInterval(function () {

            T();


        data.shift();
        data.push(NowData());


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