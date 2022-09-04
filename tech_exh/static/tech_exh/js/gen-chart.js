var chart1_option = {
    chartid : "myChart1",
    area :"#chart-1",
    data :[0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0, 0,0, 0, 0, 0,0,0,0,0,0,0],
    label:'气温',
    color:['rgba(255, 126, 79, 1)','rgba(255, 226, 170, 1)','rgba(89, 255, 211, 1)','rgba(79, 146, 255, 1)'],
    borderColor:['rgba(89, 255, 211, 1)','rgba(255, 126, 79, 1)'],
    show_text :false
}
var chart2_option = {
    chartid : "myChart2",
    area :"#chart-2",
    data :[0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0, 0,0, 0, 0, 0,0,0,0,0,0,0],
    label:'降水',
    color:['rgba(79, 146, 255, 1)','rgba(89, 255, 211, 1)','rgba(0, 0, 0, 0)','rgba(0, 0, 0, 0)'],
    borderColor:['rgba(89, 255, 211, 1)','rgba(89, 255, 211, 1)'],
    show_text : false
}
var chart3_option = {
    chartid : "myChart3",
    area :"#chart-3",
    data :[0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0, 0,0, 0, 0, 0,0,0,0,0,0,0],
    label:'湿度',
    color:['rgba(153, 89, 255, 1)','rgba(79, 167, 255, 1)','rgba(0, 0, 0, 0)','rgba(0, 0, 0, 0)'],
    borderColor:['rgba(153, 89, 255, 1)','rgba(153, 89, 255, 1)'],
    show_text : false
}
var chart4_option = {
    chartid : "myChart4",
    area :"#chart-4",
    data :[0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0, 0,0, 0, 0, 0,0,0,0,0,0,0],
    label:'气压',
    color:['rgba(250, 254, 255, 1)','rgba(156, 214, 255, 1)','rgba(0, 0, 0, 0)','rgba(0, 0, 0, 0)'],
    borderColor:['rgba(59,154,156,1)','rgba(156, 214, 255, 1)'],
    show_text : false
}
var chart5_option = {
    chartid : "myChart5",
    area :"#chart-5",
    data :[0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0, 0,0, 0, 0, 0,0,0,0,0,0,0],
    label:'光照',
    color:['rgba(156, 255, 222, 1)','rgba(255, 230, 3, 1)','rgba(0, 0, 0, 0)','rgba(0, 0, 0, 0)'],
    borderColor:['rgba(156, 255, 222, 1)','rgba(156, 255, 222, 1)'],
    show_text :false
}

var chart1 = genChart(chart1_option);
var chart2 = genChart(chart2_option);
var chart3 = genChart(chart3_option);
var chart4 = genChart(chart4_option);
var chart5 = genChart(chart5_option);
all_charts = [chart1,chart2,chart3,chart4,chart5];
function updateData(chart,data,chart_option) {
    var len = chart.data.datasets[0].data.length;
    for (var i = 0; i < len; i++) {
        chart.data.datasets[0].data.pop();
    }
    for (var i = 0; i < len; i++) {
        chart.data.datasets[0].data.push(data[i]);
    }
    chart.data.datasets[0].backgroundColor = function(context) {
        highlight_index = parseInt($("input[type='range']").val());
        const chart1 = context.chart;
        const {ctx, chartArea} = chart1;
    if (!chartArea) {return null;}// This case happens on initial chart load
    var background_positive = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
    background_positive.addColorStop(0, chart_option.color[0]);
    background_positive.addColorStop(0.8, chart_option.color[1]);
    var background_negative = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
    background_negative.addColorStop(0.7, chart_option.color[2]);
    background_negative.addColorStop(1, chart_option.color[3]);

    return data.map(function(value,index){
                        if(index>highlight_index){return 'rgba(128,128,128,0.5)';}
                        else{return value>0?background_positive:background_negative}
                    });
};
chart.data.datasets[0].borderColor = function(context){
    return data.map(function(value,index){
                        if(index>highlight_index){return 'rgba(200,200,200,0.6)';}
                        else{return value>0?chart_option.borderColor[1]:chart_option.borderColor[0]}
                    });
};
chart.update();
};
function updateAllCharts(all_data){
    updateData(chart1,all_data['temp2'],chart1_option);
    updateData(chart2,all_data['tprep'],chart2_option);
    updateData(chart3,all_data['rh'],chart3_option);
    updateData(chart4,all_data['slp'],chart4_option);
    updateData(chart5,all_data['srads'],chart5_option);
};
// let width, height, gradient;
// function getGradient(ctx,chartArea) {
//   const chartWidth = chartArea.right - chartArea.left;
//   const chartHeight = chartArea.bottom - chartArea.top;
//   if (gradient === null || width !== chartWidth || height !== chartHeight) {
//     // Create the gradient because this is either the first render
//     // or the size of the chart has changed
//     width = chartWidth;
//     height = chartHeight;
//     gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
//     gradient.addColorStop(0, '#4F92FF');
//     gradient.addColorStop(0.37,'#59FFD3');
//     gradient.addColorStop(0.37,'#593333');
//     gradient.addColorStop(1, '#FF7E4F');
// }
// return gradient;
// }

function genChart(chart_option){
    mydata = chart_option.data;
    $(chart_option.area).append("<canvas id='"+chart_option.chartid+"' ></canvas>")
    .css('background-color','rgba(255,255,255,0)').css('height','82%');

    let ctx = document.getElementById(chart_option.chartid).getContext('2d');
    var myChart = new Chart(ctx,{
        data: {
            labels: [['08','2021'], '', '', '11', '', ['01','2022'],'','','04','','','07','', '', '10', '', '', ['01','2023'],'','','04','','','07'],
            datasets: [{
                label: chart_option.label,
                type: 'bar',
                data:mydata,
                backgroundColor:function(context) {
                    highlight_index = parseInt($("input[type='range']").val());
                    const chart = context.chart;
                    const {ctx, chartArea} = chart;
                    if (!chartArea) {return null;}// This case happens on initial chart load
                    var background_positive = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
                    background_positive.addColorStop(0, chart_option.color[0]);
                    background_positive.addColorStop(0.8, chart_option.color[1]);
                    var background_negative = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
                    background_negative.addColorStop(0.7, chart_option.color[2]);
                    background_negative.addColorStop(1, chart_option.color[3]);
                    return mydata.map(function(value,index){
                        if(index>highlight_index){return 'rgba(128,128,128,0.1)';}
                        else{return value>0?background_positive:background_negative}
                    });
                },
                borderColor: function(context){
                    return mydata.map(function(value,index){
                        if(index>highlight_index){return 'rgba(0,0,0,0.3)';}
                        else{return value>0?chart_option.borderColor[1]:chart_option.borderColor[0]}
                    }
                );
                },
                borderWidth: 1,
                borderRadius: 5,
                barPercentage: 0.6,
            },{
                label:chart_option.label,
                type:'line',
                data:mydata,
                borderColor:chart_option.borderColor[1],
                borderWidth:2,
                pointRadius:0
            }]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins:{
                tooltip:{enabled: true},
                legend: {
                    display: false,
                    labels: {
                        font:{size:20},
                        color:'rgba(255,255,255,1)'
                    }
                },
                title:{
                    display:false,
                    text:'温度',
                    position:'bottom',
                    color:'rgba(255,255,255,1)',
                    font:{size:25}
                }
            },
            scales:{
                x:{grid:{display:false,drawBorder:false,},ticks:{color:'rgba(255,255,255,1)',maxRotation: 0,
                    minRotation: 0,autoSkip:false,font:{size:13}}},
            y:{grid:{drawBorder:false,},ticks:{color:'rgba(255,255,255,1)',font:{size:0}}}
        },
        "hover": {
            mode:null
        },
        "animation": {
            "duration": 1,
            "onComplete": function(context) {
                let ctx = document.getElementById(chart_option.chartid).getContext('2d');
                // ctx.font = Chart.helpers.fontString(Chart.defaults.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                const chart = context.chart;
                show_tooltip = chart.options.plugins.tooltip.enabled;
                if(!show_tooltip){
                ctx.font = "10px Arial";
                ctx.fillStyle = "#FFFFFF"
                this.data.datasets.forEach(function(dataset, i) {
                    var meta = chart.getDatasetMeta(i);
                    if(dataset.label!='湿度'){
                        dataset.data.forEach(function(data,i) {
                            if(data>=0){
                                data = data.toString();
                                data = data.slice(0,data.indexOf(".")+3);
                                ctx.fillText(data, meta.data[i].x-13, meta.data[i].y-3);
                            }else{
                                data = data.toString();
                                data = data.slice(0,data.indexOf(".")+3);
                                ctx.fillText(data, meta.data[i].x-13, meta.data[i].y+10);
                            }
                        });
                    }else{
                        dataset.data.forEach(function(data,i) {
                            if(data>=0){
                                data = data.toString();
                                data = data.slice(0,data.indexOf(".")+3) + '';
                                ctx.fillText(data, meta.data[i].x-13, meta.data[i].y-5);
                            }else{
                                data = data.toString();
                                data = data.slice(0,data.indexOf(".")+3) + '';
                                ctx.fillText(data, meta.data[i].x-13, meta.data[i].y+10);
                            }
                        });
                    }
                    });
            }
        }
        },
    },
});
return myChart;
}